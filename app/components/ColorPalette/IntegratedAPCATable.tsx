import React from "react";
import type { ColorInfo, ContrastInfo } from "~/lib/utils/colorAnalysis";
import { analyzeContrast, passesAPCA } from "~/lib/utils/colorAnalysis";

interface IntegratedAPCATableProps {
  colors: ColorInfo[];
}

interface ExtendedContrastResult extends ContrastInfo {
  name: string;
  hex: string;
  passesLargeText: boolean;
  passesUI: boolean;
  range: "light" | "dark" | "high-contrast";
}

/**
 * Parse color step from name (e.g., "purple-700" -> 700)
 */
function getColorStep(name: string): number {
  const parts = name.split("-");
  const step = parseInt(parts[parts.length - 1], 10);
  return isNaN(step) ? 0 : step;
}

/**
 * Determine which background to use based on Adobe Spectrum principles:
 * - 100-500 (light colors): compare against black background (for dark mode text)
 * - 600-1000 (dark colors): compare against white background (for light mode)
 * - 1100-1400 (high contrast): compare against white background (high contrast mode)
 */
function getBackgroundForRange(step: number): {
  background: string;
  range: "light" | "dark" | "high-contrast";
} {
  if (step <= 500) {
    return { background: "#000000", range: "light" };
  } else if (step <= 1000) {
    return { background: "#ffffff", range: "dark" };
  } else {
    return { background: "#ffffff", range: "high-contrast" };
  }
}

export function IntegratedAPCATable({ colors }: IntegratedAPCATableProps) {
  const contrastResults: ExtendedContrastResult[] = React.useMemo(() => {
    return colors.map((color) => {
      const step = getColorStep(color.name);
      const { background, range } = getBackgroundForRange(step);
      const { apca } = analyzeContrast(color.hex, background);

      return {
        name: color.name,
        hex: color.hex,
        foreground: color.hex,
        background,
        apca,
        passes: passesAPCA(apca, "body-text"),
        passesLargeText: passesAPCA(apca, "large-text"),
        passesUI: passesAPCA(apca, "ui"),
        range,
      };
    });
  }, [colors]);

  // Group by range for visual separation
  const lightColors = contrastResults.filter((c) => c.range === "light");
  const darkColors = contrastResults.filter((c) => c.range === "dark");
  const highContrastColors = contrastResults.filter((c) => c.range === "high-contrast");

  const renderTable = (
    results: ExtendedContrastResult[],
    title: string,
    description: string
  ) => (
    <div className="mb-8">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">색상</th>
              <th className="border border-gray-300 px-4 py-2 text-left">미리보기</th>
              <th className="border border-gray-300 px-4 py-2 text-left">HEX</th>
              <th className="border border-gray-300 px-4 py-2 text-right">APCA Lc</th>
              <th className="border border-gray-300 px-4 py-2 text-center">본문 텍스트</th>
              <th className="border border-gray-300 px-4 py-2 text-center">큰 텍스트</th>
              <th className="border border-gray-300 px-4 py-2 text-center">UI</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.name} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  {result.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-12 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: result.hex }}
                    />
                    <div
                      className="w-12 h-8 rounded border border-gray-300 flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: result.background,
                        color: result.hex,
                      }}
                    >
                      Aa
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  {result.hex}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                  {result.apca.toFixed(1)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      result.passes
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.passes ? "✓ Pass" : "✗ Fail"}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      result.passesLargeText
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.passesLargeText ? "✓ Pass" : "✗ Fail"}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      result.passesUI
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.passesUI ? "✓ Pass" : "✗ Fail"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">
          Adobe Spectrum 기반 APCA 대비 분석
        </h3>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800">
            <strong>Adobe Spectrum 색상 스케일 원칙:</strong> 색상 단계에 따라
            적절한 배경색을 기준으로 대비를 측정합니다.
          </p>
          <ul className="list-disc list-inside ml-4 text-sm text-blue-700 mt-2">
            <li>
              <strong>100-500 (밝은 색상)</strong>: 검은색 배경 기준 - 다크
              모드에서 텍스트로 사용
            </li>
            <li>
              <strong>600-1000 (어두운 색상)</strong>: 흰색 배경 기준 - 라이트
              모드에서 버튼/텍스트로 사용
            </li>
            <li>
              <strong>1100-1400 (고대비 색상)</strong>: 흰색 배경 기준 - 고대비
              접근성 모드
            </li>
          </ul>
        </div>
      </div>

      {lightColors.length > 0 &&
        renderTable(
          lightColors,
          "밝은 색상 (100-500) vs 검은색 배경",
          "다크 모드에서 텍스트나 아이콘으로 사용될 때의 가독성을 측정합니다."
        )}

      {darkColors.length > 0 &&
        renderTable(
          darkColors,
          "어두운 색상 (600-1000) vs 흰색 배경",
          "라이트 모드에서 버튼, 텍스트, 아이콘으로 사용될 때의 가독성을 측정합니다."
        )}

      {highContrastColors.length > 0 &&
        renderTable(
          highContrastColors,
          "고대비 색상 (1100-1400) vs 흰색 배경",
          "WCAG AAA 수준의 고대비 접근성 요구사항을 충족하기 위한 색상입니다."
        )}
    </div>
  );
}
