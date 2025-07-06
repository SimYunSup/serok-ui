import * as fs from "fs/promises";
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

const dirname = import.meta.dirname;
const outputDirName = "../public/r";
const inputDirName = "../lib";

const targetDir = path.join(dirname, inputDirName);

const EXCEPTIONS = ["stories"];

// utils

const filterDirectotries = async () => {
  const allEntries = await fs.readdir(targetDir, { withFileTypes: true });
  const filteredFolders = allEntries
    .filter((entry) => entry.isDirectory() && !EXCEPTIONS.includes(entry.name))
    .map((entry) => entry.name);

  return filteredFolders;
};

const getFileType = (fileName: string): string => {
  const ext = path.extname(fileName).toLowerCase();
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

const getDependencies = (content: string): string[] => {
  const dependencies = new Set<string>();

  // 멀티라인 import 구문도 처리할 수 있는 정규식 (s 플래그 사용으로 . 이 줄바꿈도 매치)
  const importRegex = /import\s+(?:[\s\S]*?\s+from\s+)?['"`]([^'"`]+)['"`]/g;

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // 상대 경로나 CSS 파일은 제외
    if (
      !importPath.startsWith(".") &&
      !importPath.startsWith("/") &&
      !importPath.endsWith(".css")
    ) {
      // @로 시작하는 scoped package나 일반 package name 추출
      const packageName = importPath.startsWith("@")
        ? importPath.split("/").slice(0, 2).join("/")
        : importPath.split("/")[0];

      dependencies.add(packageName);
    }
  }

  return Array.from(dependencies);
};

// build process
(async function main() {
  // 빌드 제외 폴더 및 파일을 제외
  const filteredFolders = await filterDirectotries();

  const targetPath = path.join(dirname, outputDirName);
  await fs.mkdir(targetPath, { recursive: true });

  // build start
  await Promise.allSettled(
    filteredFolders.map(async (folderName) => {
      console.log(`build start: ${folderName}`);

      try {
        const sourcePath = path.join(targetDir, folderName);
        const files = await fs.readdir(sourcePath);
        const registry: RegistryItem = {
          $schema: "https://ui.shadcn.com/schema/registry-item.json",
          name: `serok ${folderName}`,
          type: "registry:ui",
          title: folderName,
          description: `serok ${folderName}`,
          files: [],
          dependencies: [],
        };

        const allDependencies = new Set<string>();

        await Promise.all(
          files.map(async (file) => {
            const filePath = path.join(sourcePath, file);
            const content = await fs.readFile(filePath, "utf-8");
            const fileType = getFileType(file);

            if (fileType === "registry:ui") {
              const fileDependencies = getDependencies(content);
              fileDependencies.forEach((dep) => allDependencies.add(dep));
            }

            registry["files"].push({
              type: fileType,
              path: filePath,
              content,
            });
          })
        );

        registry.dependencies = Array.from(allDependencies);

        const outputFilePath = path.join(targetPath, `${folderName}.json`);
        await fs.writeFile(outputFilePath, JSON.stringify(registry, null, 2));

        console.log(`build success: ${folderName}`);
      } catch (error) {
        console.error(`build failed: ${folderName}`, error);
      }
    })
  );
})();
