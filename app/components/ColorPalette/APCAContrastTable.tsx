import React from "react";
import type { ColorInfo, ContrastInfo } from "~/lib/utils/colorAnalysis";
import { analyzeContrast, passesAPCA } from "~/lib/utils/colorAnalysis";

interface APCAContrastTableProps {
  colors: ColorInfo[];
  backgroundColor: string;
  backgroundName?: string;
}
interface ExtendedContrastResult extends ContrastInfo {
  name: string;
  hex: string;
  passesLargeText: boolean;
  passesUI: boolean;
}

export function APCAContrastTable({
  colors,
  backgroundColor,
  backgroundName = "Background",
}: APCAContrastTableProps) {
  // Calculate APCA contrast for each color against the background


  const contrastResults: ExtendedContrastResult[] = React.useMemo(
    () =>
      colors.map((color) => {
        const { apca } = analyzeContrast(color.hex, backgroundColor);
        return {
          name: color.name,
          hex: color.hex,
          foreground: color.hex,
          background: backgroundColor,
          apca,
          passes: passesAPCA(apca, "body-text"),
          passesLargeText: passesAPCA(apca, "large-text"),
          passesUI: passesAPCA(apca, "ui"),
        };
      }),
    [colors, backgroundColor]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-4">
        APCA Contrast Analysis (against {backgroundName})
      </h4>
      <div className="mb-4 text-sm text-gray-600">
        <p>
          <strong>APCA Thresholds:</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Body Text: 75 Lc</li>
          <li>Large Text: 60 Lc</li>
          <li>UI Components: 45 Lc</li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Color</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Swatch</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Hex</th>
              <th className="border border-gray-300 px-4 py-2 text-right">APCA Lc</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Body Text</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Large Text</th>
              <th className="border border-gray-300 px-4 py-2 text-center">UI</th>
            </tr>
          </thead>
          <tbody>
            {contrastResults.map((result) => (
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
                        backgroundColor: backgroundColor,
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
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${result.passes
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {result.passes ? "✓ Pass" : "✗ Fail"}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${result.passesLargeText
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {result.passesLargeText ? "✓ Pass" : "✗ Fail"}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${result.passesUI
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
}
