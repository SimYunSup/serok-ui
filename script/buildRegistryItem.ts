import { readdir, readFile, stat, mkdir, writeFile } from "fs/promises";
import * as csstree from "css-tree";
import path from "path";

interface RegistryItem {
  $schema: "https://ui.shadcn.com/schema/registry-item.json";
  name: string;
  type: string;
  title: string;
  description: string;
  files: {
    path: string;
    type: string;
    content: string;
  }[];
  dependencies: string[];
  cssVars?: Record<string, Record<string, string>>;
  css?: Record<string, Record<string, Record<string, string>>>;
}

const targetFolderName = "../lib";
const targetFolder = path.join(import.meta.dirname, targetFolderName);
const OUTPUT_DIR = "public/r";

const readDirectory = async (currentPath) => {
  const folderNames = await readdir(currentPath);

  return folderNames;
};

const extractDependencies = (content: string): string[] => {
  const dependencies = new Set<string>();
  const importRegex =
    /import(?:["'\s]*(?:[\w*{}\n\r\t, ]+)from\s*)?["'](.*?)["']/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const dep = match[1];
    if (!dep.startsWith(".") && !dep.startsWith("node:")) {
      if (dep.startsWith("@")) {
        const parts = dep.split("/");
        if (parts.length >= 2) {
          dependencies.add(`${parts[0]}/${parts[1]}`); // @swc-react/button
        } else {
          dependencies.add(dep);
        }
      } else {
        const parts = dep.split("/");
        dependencies.add(parts[0]);
      }
    }
  }
  return Array.from(dependencies);
};

const getFileType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".tsx":
    case ".jsx":
      return "registry:ui";
    case ".css":
      return "registry:style";
    case ".ts":
    case ".js":
      return "registry:lib";
    default:
      return "registry:file";
  }
};

const main = async () => {
  const folderNames = await readDirectory(targetFolder);
  const stats = await Promise.all(
    folderNames.map((item) => stat(path.join(targetFolder, item)))
  );
  const targetFileNames = folderNames.filter(
    (item, index) => stats[index].isDirectory() && item !== "stories"
  );

  await mkdir(OUTPUT_DIR, { recursive: true });

  targetFileNames.forEach(async (item) => {
    console.log(`Processing component: ${item}`);
    if (item.includes("Provider")) return;

    const currentPath = path.join(targetFolder, item);
    const fileNames = await readdir(currentPath);
    const allDependencies = new Set<string>();

    const registryItem: RegistryItem = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: `serok ${item}`,
      type: "registry:ui",
      title: item,
      description: `serok ${item}`,
      dependencies: [],
      files: [],
    };

    fileNames.forEach(async (file) => {
      if (file.endsWith(".tsx")) {
        const currentFilePath = path.join(currentPath, file);
        const fileContent = await readFile(currentFilePath, "utf-8");
        const fileDependencies = extractDependencies(fileContent);
        fileDependencies.forEach((dep) => allDependencies.add(dep));
        const fileType = getFileType(file);

        registryItem.files.push({
          path: currentFilePath,
          type: fileType,
          content: fileContent,
        });
      }

      if (file.endsWith(".css")) {
        const currentFilePath = path.join(currentPath, file);
        const fileContent = await readFile(currentFilePath, "utf-8");
        const ast = csstree.parse(fileContent);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: Record<string, any> = {};

        csstree.walk(ast, {
          visit: "Atrule",
          enter(node) {
            if (!node.prelude || node.block?.type !== "Block") return;

            const layerName =
              node.name === "layer"
                ? `@layer ${csstree.generate(node.prelude)}`
                : null;
            if (!layerName) return;
            if (!result[layerName]) result[layerName] = {};

            for (const rule of node.block.children.toArray()) {
              if (rule.type !== "Rule") continue;

              const outerSelector = csstree.generate(rule.prelude);
              if (!result[layerName][outerSelector])
                result[layerName][outerSelector] = {};

              for (const decl of rule.block.children.toArray()) {
                if (decl.type === "Declaration") {
                  result[layerName][outerSelector][decl.property] =
                    csstree.generate(decl.value);
                }
              }

              for (const nestedRule of rule.block.children.toArray()) {
                if (nestedRule.type !== "Rule") continue;

                const nestedSelector = csstree.generate(nestedRule.prelude);
                result[layerName][outerSelector][nestedSelector] = {};

                for (const decl of nestedRule.block.children.toArray()) {
                  if (decl.type === "Declaration") {
                    result[layerName][outerSelector][nestedSelector][
                      decl.property
                    ] = csstree.generate(decl.value);
                  }
                }
              }
            }
          },
        });

        // console.log(JSON.stringify(result, null, 2));
        registryItem.css = result;
      }

      if (registryItem.files.length > 0) {
        if (allDependencies.size > 0) {
          registryItem.dependencies = Array.from(allDependencies).sort();
        }

        const outputFilePath = path.join(
          OUTPUT_DIR,
          `${item.toLowerCase()}.json`
        );

        await writeFile(outputFilePath, JSON.stringify(registryItem, null, 2));
        console.log(`Generated registry item for ${item}`);
      } else {
        console.warn(
          `No .tsx or .css files found for component ${item}. Skipping.`
        );
      }
    });
  });
};

main();
