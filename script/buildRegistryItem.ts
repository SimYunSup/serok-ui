import fs, {  readFileSync, statSync } from 'fs'
import { readdir } from 'fs/promises';
import path from 'path';


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
  cssVars?: Record<string, Record<string, string>>
}

const targetFolderName = "../lib"
const targetFolder = path.join(import.meta.dirname, targetFolderName)
const OUTPUT_DIR = 'public/r'

const readDirectory = async (currentPath) => {
  const folderNames = await readdir(currentPath)

  return folderNames
}

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
  const folderNames = await readDirectory(targetFolder)
  const targetFileNames = folderNames.filter(item => statSync(path.join(targetFolder, item)).isDirectory() && item !== 'stories');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  targetFileNames.forEach(async item => {
    const currentPath = path.join(targetFolder, item)
    const fileNames = await readdir(currentPath)
    const allDependencies = new Set<string>();
    
    const registryItem: RegistryItem = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: `serok ${item}`,
      type: 'registry:ui',
      title: item,
      description: `serok ${item}`,
      dependencies: [],
      files: []
    }

    fileNames.forEach(file => {
      const currentFilePath = path.join(currentPath, file);
      const fileContent = readFileSync(currentFilePath, 'utf-8')
      const fileDependencies = extractDependencies(fileContent);
      fileDependencies.forEach((dep) => allDependencies.add(dep));
      const fileType = getFileType(file);



      registryItem.files.push({
        path: currentFilePath,
        type: fileType,
        content: fileContent,
      });
    })
    if (registryItem.files.length > 0) {
          if (allDependencies.size > 0) {
            registryItem.dependencies = Array.from(allDependencies).sort();
          }
    
          const outputFilePath = path.join(
            OUTPUT_DIR,
            `${item.toLowerCase()}.json`
          );

          fs.writeFileSync(outputFilePath, JSON.stringify(registryItem, null, 2));
          console.log(`Generated registry item for ${item}`);

        } else {
          console.warn(
            `No .tsx or .css files found for component ${item}. Skipping.`
          );
        }
  })
}

main()
