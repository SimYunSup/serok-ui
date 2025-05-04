// registry.json을 생성하는 스크립트
// lib 폴더의 소스 파일을 직접 읽어 shadcn build 형식으로 생성합니다.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 라이브러리 컴포넌트 소스 파일이 있는 디렉토리 경로
const LIB_DIR = path.join(__dirname, "../lib");
// 최종 registry.json 파일이 생성될 경로 (프로젝트 루트)
const OUTPUT_FILE = path.join(__dirname, "../registry.json");
// 빌드에서 제외할 폴더 이름 목록
const exceptions = ["stories"]; // 필요에 따라 제외할 폴더 추가

// Registry Item의 타입을 정의합니다.
type RegistryItemType =
  | "registry:block"
  | "registry:component"
  | "registry:lib"
  | "registry:hook"
  | "registry:ui"
  | "registry:page"
  | "registry:file"
  | "registry:theme";

// 최종 registry.json의 items 배열에 들어갈 항목의 구조
interface RegistryItemEntry {
  name: string; // 컴포넌트 이름 (소문자)
  type: RegistryItemType; // 컴포넌트 타입 (주로 registry:ui)
  title: string; // 컴포넌트 제목 (첫 글자 대문자)
  description: string; // 컴포넌트 설명
  dependencies?: string[]; // 외부 의존성 목록
  files: {
    path: string; // 파일의 전체 상대 경로 (예: lib/button/index.tsx)
    type: RegistryItemType; // 파일 타입
  }[];
}

// 최종 registry.json 파일의 전체 구조
interface Registry {
  $schema: "https://ui.shadcn.com/schema/registry.json";
  name: string; // 레지스트리 이름 (예: serok-ui)
  homepage: string; // 프로젝트 홈페이지 URL
  items: RegistryItemEntry[]; // 컴포넌트 항목 목록
}

// 파일 확장자에 따른 RegistryItemType을 반환하는 함수
const getFileType = (filePath: string): RegistryItemType => {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".tsx":
    case ".jsx":
    case ".css":
      return "registry:component"; // 컴포넌트 파일
    case ".ts":
    case ".js":
      // 내용에 따라 hook, lib 등으로 더 세분화할 수 있음
      // 여기서는 간단하게 registry:lib으로 처리
      return "registry:lib";
    default:
      return "registry:file"; // 기타 파일
  }
};

// 파일 내용에서 import 문을 분석하여 외부 의존성을 추출하는 함수
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
        dependencies.add(parts.length >= 2 ? `${parts[0]}/${parts[1]}` : dep);
      } else {
        dependencies.add(dep.split("/")[0]);
      }
    }
  }
  return Array.from(dependencies);
};

// 문자열의 첫 글자를 대문자로 변환하는 함수
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const main = () => {
  // 최종 registry.json 구조 초기화
  const registry: Registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "serok-ui", // 프로젝트 이름에 맞게 수정
    homepage: "https://your-project-homepage.com", // 실제 홈페이지 URL로 수정
    items: [],
  };

  try {
    // LIB_DIR 내의 디렉토리 목록을 읽어옵니다.
    const componentDirs = fs.readdirSync(LIB_DIR).filter((name) => {
      const fullPath = path.join(LIB_DIR, name);
      return !exceptions.includes(name) && fs.statSync(fullPath).isDirectory();
    });

    // 각 컴포넌트 디렉토리에 대해 반복합니다.
    componentDirs.forEach((componentName) => {
      const componentDir = path.join(LIB_DIR, componentName);
      const allDependencies = new Set<string>();
      const componentFiles: RegistryItemEntry["files"] = [];

      try {
        // 컴포넌트 디렉토리 내의 파일 목록을 읽어옵니다.
        const files = fs.readdirSync(componentDir);

        files.forEach((fileName) => {
          const filePath = path.join(componentDir, fileName);
          // 파일인지 확인하고, 관련 확장자만 포함 (.tsx, .css 등)
          // 필요에 따라 확장자 추가/수정
          if (
            fs.statSync(filePath).isFile() &&
            /\.(tsx|jsx|css|ts|js)$/.test(fileName)
          ) {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const fileType = getFileType(fileName);
            const relativePath = `lib/${componentName}/${fileName}`; // 최종 경로 생성

            // 파일 내용에서 의존성 추출 및 추가
            const fileDependencies = extractDependencies(fileContent);
            fileDependencies.forEach((dep) => allDependencies.add(dep));

            componentFiles.push({
              path: relativePath,
              type: fileType,
            });
          }
        });

        // 처리된 파일이 있는 경우에만 registry item 생성
        if (componentFiles.length > 0) {
          const registryEntry: RegistryItemEntry = {
            name: componentName.toLowerCase(),
            // 기본 타입을 'registry:ui'로 설정하거나, 주 파일(예: index.tsx) 기준으로 결정 가능
            type: "registry:ui",
            title: capitalize(componentName),
            description: `Component: ${capitalize(componentName)}`, // 기본 설명
            dependencies:
              allDependencies.size > 0
                ? Array.from(allDependencies).sort()
                : undefined,
            files: componentFiles,
          };
          registry.items.push(registryEntry);
          console.log(`Processed component: ${componentName}`);
        } else {
          console.warn(
            `No relevant source files found for component ${componentName}. Skipping.`
          );
        }
      } catch (error) {
        console.error(
          `Error processing component directory ${componentName}:`,
          error
        );
      }
    });

    // 이름순으로 정렬 (선택 사항)
    registry.items.sort((a, b) => a.name.localeCompare(b.name));

    // 최종 registry.json 파일 작성 (프로젝트 루트)
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));
    console.log(
      `\nSuccessfully generated registry.json with ${registry.items.length} items at ${OUTPUT_FILE}`
    );
  } catch (error) {
    console.error(
      "An unexpected error occurred during registry generation:",
      error
    );
    process.exit(1);
  }
};

main();
