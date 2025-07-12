// registry.json을 생성하는 스크립트
// lib 폴더의 소스 파일을 직접 읽어 shadcn build 형식으로 생성합니다.

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { readPackageJSON } from "pkg-types";

const cwd = process.cwd();
const packageJSON = await readPackageJSON(cwd);
const LIB_FOLDER = "lib"; // 라이브러리 소스 파일이 있는 디렉토리 이름

const libDirectory = path.join(cwd, LIB_FOLDER);
const OUTPUT_FILE = path.join(cwd, "registry.json");

interface ComponentFile {
  path: string;
  type: string;
}
// 최종 registry.json의 items 배열에 들어갈 항목의 구조
interface RegistryItemEntry {
  name: string; // 컴포넌트 이름 (소문자)
  type: string; // 컴포넌트 타입 (주로 registry:ui)
  title: string; // 컴포넌트 제목 (첫 글자 대문자)
  description: string; // 컴포넌트 설명
  dependencies?: string[]; // 외부 의존성 목록
  registryDependencies?: string[];
  css?: Record<string, any>; // CSS 내용 (스타일 블록)
  files?: ComponentFile[];
}

const types = ["block", "ui", "lib", "component", "hook", "file", "style"] as const;

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: packageJSON.name, // 레지스트리 이름 (예: serok-ui)
  homepage: packageJSON.homepage, // 프로젝트 홈페이지 URL
  items: [] as RegistryItemEntry[], // 컴포넌트 항목 목록
}

// 파일 내용에서 import 문을 분석하여 외부 의존성을 추출하는 함수
const extractDependenciesFromJS = (content: string): string[] => {
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
const extractDependenciesFromCSS = (content: string): string[] => {
  const dependencies = new Set<string>();
  const importRegex =
  /@import\s+["'](.*?)["']/g;
  let match: RegExpExecArray | null = null;

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

// CSS 문자열을 JSON 객체로 변환하는 함수
const transformCssToJson = (css: string): Record<string, any> => {
  // 1. 전처리: 주석 제거 및 공백 정리
  css = css.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "$1").trim();

  const result: Record<string, any> = {};
  let i = 0;
  const len = css.length;

  // 현재 경로에 값을 설정하는 visitor 함수
  const visitor = (path: string[], value: any) => {
    let current = result;
    for (let j = 0; j < path.length - 1; j++) {
      const segment = path[j];
      if (!current[segment]) {
        current[segment] = {};
      }
      current = current[segment];
    }
    const lastSegment = path[path.length - 1];
    // 여러 선택자 (예: "h1, h2")에 대한 기존 선언을 병합합니다.
    current[lastSegment] = { ...(current[lastSegment] || {}), ...value };
  };

  const parse = (currentPath: string[] = [], depth = 0) => {
    let selector = '';
    let declarations: Record<string, any> = {};

    while (i < len) {
      const char = css[i];
      if (char === '{') {
        i++;
        const blockKey = selector.trim();
        selector = ''; // 셀렉터 초기화

        // @-규칙 블록 내부를 재귀적으로 파싱
        if (blockKey.startsWith('@')) {
          parse([...currentPath, blockKey], depth + 1);
        } else { // 일반 규칙 블록
          const contentEnd = css.indexOf('}', i);
          if (contentEnd === -1) break; // 닫는 괄호가 없으면 중단

          const declarationStr = css.substring(i, contentEnd);
          declarations = {};
          declarationStr.split(';').forEach(decl => {
            if (decl.trim()) {
              const parts = decl.split(':');
              const key = parts.shift()?.trim();
              const value = parts.join(':').trim();
              if (key && value) {
                declarations[key] = value;
              }
            }
          });

          // 여러 선택자 (예: "from, to" 또는 ".a, .b") 처리
          blockKey.split(',').forEach(sel => {
            visitor([...currentPath, sel.trim()], declarations);
          });

          i = contentEnd; // 파싱한 부분 건너뛰기
        }
      } else if (char === '}') {
        i++;
        // 현재 깊이의 파싱이 끝나면 반환
        if (depth > 0) return;
      } else if (char === ';' && depth === 0) {
        result[selector.trim() + ";"] = {};
        selector = '';
        i++;
      } else {
        selector += char;
        i++;
      }
    }
  };

  parse(); // 최상위 레벨에서 파싱 시작
  return result;
};

// 문자열의 첫 글자를 대문자로 변환하는 함수
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);


try {
  for (const type of types) {
    const typeDir = path.join(libDirectory, type);
    const exists = await fs.access(typeDir).then(() => true).catch(() => false);
    if (!exists) {
      continue;
    }
    const items = await fs.readdir(typeDir, { withFileTypes: true });

    if (type === "style") {
      for (const item of items) {
        if (item.isFile()) {
          const filePath = path.join(typeDir, item.name);
          const content = await fs.readFile(filePath, "utf-8");
          const dependencies = extractDependenciesFromCSS(content);
          registry.items.push({
            name: item.name.replace(".css", ""),
            type: "registry:style",
            title: `style: ${capitalize(item.name.replace(".css", ""))}`,
            description: "",
            css: transformCssToJson(content),
            dependencies: dependencies.length > 0 ? dependencies : undefined,
          });
        }
      }
      continue;
    }

    for (const item of items) {
      if (item.isDirectory()) {
        const componentName = item.name;
        const componentPath = path.join(typeDir, componentName);
        const files = await fs.readdir(componentPath, { withFileTypes: true });
        const fileData: ComponentFile[] = [];
        const externalDependencies = new Set<string>();
        const registryDependencies = new Set<string>(); // TODO: for ui / block.
        for (const file of files) {
          if (file.isFile() && (file.name.endsWith(".ts") || file.name.endsWith(".tsx"))) {
            const filePath = path.join(componentPath, file.name);
            const content = await fs.readFile(filePath, "utf-8");
            const fileType = content.match(/\/\*[\s\S]*registry:([a-z]*)[\s\S]*?\*\//)?.[1];
            const dependencies = extractDependenciesFromJS(content);
            const relativePath = path.relative(cwd, filePath);
            fileData.push({
              path: relativePath,
              type: fileType ? `registry:${fileType}` : "registry:component",
            });
            dependencies.forEach(dep => {
              externalDependencies.add(dep);
            });
          }
          else if (file.isFile() && file.name.endsWith(".css")) {
            const filePath = path.join(componentPath, file.name);
            const content = await fs.readFile(filePath, "utf-8");
            const dependencies = extractDependenciesFromCSS(content);
            const relativePath = path.relative(cwd, filePath);
            fileData.push({
              path: relativePath,
              type: "registry:component",
            });
            dependencies.forEach(dep => {
              externalDependencies.add(dep);
            });
          }
        }

        registry.items.push({
          name: componentName.toLowerCase(),
          type: `registry:${type}`,
          title: capitalize(componentName),
          description: `${type}: ${capitalize(componentName)}`,
          dependencies: Array.from(externalDependencies),
          registryDependencies: registryDependencies.size > 0 ? Array.from(registryDependencies) : undefined,
          files: fileData,
        });
      }
    }
  }
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(registry, null, 2));
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
