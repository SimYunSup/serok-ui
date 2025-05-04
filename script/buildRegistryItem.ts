// registry item을 생성하는 스크립트

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 빌드에서 제외할 폴더 이름 목록
const exceptions = ["stories"];

const LIB_DIR = path.join(__dirname, "../lib");
const OUTPUT_DIR = path.join(__dirname, "../public/r");

type RegistryItemType =
  | "registry:block"
  | "registry:component"
  | "registry:lib"
  | "registry:hook"
  | "registry:ui"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme";

interface RegistryItem {
  $schema: "https://ui.shadcn.com/schema/registry-item.json";
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies?: string[];
  file: {
    path: string;
    type: RegistryItemType;
    content: string;
  }[];
}

const getFileType = (filePath: string): RegistryItemType => {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".tsx":
    case ".jsx":
      return "registry:ui";
    case ".css":
      return "registry:style";
    case ".ts":
    case ".js":
      // 내용에 따라 hook, lib 등으로 더 세분화할 수 있음
      // 여기서는 간단하게 registry:lib으로 처리
      return "registry:lib";
    default:
      return "registry:file"; // 기타 파일
  }
};

const extractDependencies = (content: string): string[] => {
  const dependencies = new Set<string>();
  // 정규 표현식을 사용하여 import 문을 찾습니다.
  // 예: import ... from 'dependency'; import 'dependency';
  const importRegex =
    /import(?:["'\s]*(?:[\w*{}\n\r\t, ]+)from\s*)?["'](.*?)["']/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const dep = match[1];
    // 상대 경로(../, ./)가 아니고, Node.js 내장 모듈이 아닌 경우 외부 의존성으로 간주
    if (!dep.startsWith(".") && !dep.startsWith("node:")) {
      // @로 시작하는 scoped package 처리
      if (dep.startsWith("@")) {
        const parts = dep.split("/");
        if (parts.length >= 2) {
          dependencies.add(`${parts[0]}/${parts[1]}`); // 예: @swc-react/button
        } else {
          dependencies.add(dep); // 예: @scope 만 있는 경우 (드물지만)
        }
      } else {
        const parts = dep.split("/");
        dependencies.add(parts[0]); // 예: react, react-dom/client -> react
      }
    }
  }
  return Array.from(dependencies);
};

const main = () => {
  const components = fs.readdirSync(LIB_DIR).filter((name) => {
    const fullPath = path.join(LIB_DIR, name);
    if (exceptions.includes(name)) {
      return false;
    }
    return fs.statSync(fullPath).isDirectory();
  });

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  components.forEach((component) => {
    const componentDir = path.join(LIB_DIR, component);
    const allDependencies = new Set<string>();
    const registryItem: RegistryItem = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: component.toLowerCase(),
      type: "registry:ui",
      title: component,
      description: `Component: ${component}`,
      file: [],
    };

    const files = fs.readdirSync(componentDir).filter((name) => {
      const fullPath = path.join(componentDir, name);
      return (
        (fs.statSync(fullPath).isFile() && name.endsWith(".tsx")) ||
        name.endsWith(".css")
      );
    });

    files.forEach((fileName) => {
      const filePath = path.join(componentDir, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const fileType = getFileType(fileName); // 파일 타입 결정

      const fileDependencies = extractDependencies(fileContent);
      fileDependencies.forEach((dep) => allDependencies.add(dep));

      registryItem.file.push({
        path: fileName,
        type: fileType,
        content: fileContent,
      });
    });

    // 파일이 존재하는 경우에만 JSON 파일로 저장
    if (registryItem.file.length > 0) {
      if (allDependencies.size > 0) {
        registryItem.dependencies = Array.from(allDependencies).sort();
      }

      const outputFilePath = path.join(
        OUTPUT_DIR,
        `${component.toLowerCase()}.json`
      );
      fs.writeFileSync(outputFilePath, JSON.stringify(registryItem, null, 2));
      console.log(`Generated registry item for ${component}`);
    } else {
      console.warn(
        `No .tsx or .css files found for component ${component}. Skipping.`
      );
    }
  });
};

main();
