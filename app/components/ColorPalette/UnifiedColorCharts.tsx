import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import type { ColorInfo } from "~/lib/utils/colorAnalysis";

interface UnifiedColorChartsProps {
  colorsByFamily: Record<string, ColorInfo[]>;
}

// Color palette for different families
const familyColors: Record<string, string> = {
  gray: "#6B7280",
  red: "#EF4444",
  orange: "#F97316",
  yellow: "#EAB308",
  chartreuse: "#84CC16",
  celery: "#22C55E",
  green: "#10B981",
  cyan: "#06B6D4",
  seafoam: "#14B8A6",
  blue: "#3B82F6",
  indigo: "#6366F1",
  purple: "#A855F7",
  fuchsia: "#D946EF",
  magenta: "#EC4899",
};

export function UnifiedColorCharts({ colorsByFamily }: UnifiedColorChartsProps) {

  // Group by shade index for comparison
  const maxShades = Math.max(...Object.values(colorsByFamily).map((c) => c.length));
  const shadeComparisonData = Array.from({ length: maxShades }, (_, index) => {
    const dataPoint: Record<string, string | number> = { shade: index.toString() };
    Object.entries(colorsByFamily).forEach(([family, colors]) => {
      if (colors[index]) {
        dataPoint[`${family}-lightness`] = (colors[index].lightness * 100).toFixed(2);
        dataPoint[`${family}-chroma`] = colors[index].chroma.toFixed(4);
        dataPoint[`${family}-hue`] = colors[index].hue ?? 0;
      }
    });
    return dataPoint;
  });

  return (
    <div className="space-y-8">
      {/* Lightness Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-2">명도 (Lightness) 분포</h4>
        <p className="text-sm text-gray-600 mb-4">
          모든 색상 패밀리의 명도 값을 비교합니다. OKLCH의 L 값은 0-100% 범위이며,
          인간의 지각적 균일성을 반영합니다.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={shadeComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="shade"
              label={{ value: "색상 단계", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              domain={[0, 100]}
              label={{ value: "명도 (%)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            {Object.keys(colorsByFamily).map((family) => (
              <Line
                key={family}
                type="monotone"
                dataKey={`${family}-lightness`}
                stroke={familyColors[family] || "#666"}
                strokeWidth={2}
                dot={{ r: 4 }}
                name={family}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chroma Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-2">채도 (Chroma) 분포</h4>
        <p className="text-sm text-gray-600 mb-4">
          모든 색상 패밀리의 채도 값을 비교합니다. Chroma 값이 높을수록 색상이 더
          선명하고 포화도가 높습니다.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={shadeComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="shade"
              label={{ value: "색상 단계", position: "insideBottom", offset: -5 }}
            />
            <YAxis label={{ value: "채도", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            {Object.keys(colorsByFamily).map((family) => (
              <Line
                key={family}
                type="monotone"
                dataKey={`${family}-chroma`}
                stroke={familyColors[family] || "#666"}
                strokeWidth={2}
                dot={{ r: 4 }}
                name={family}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hue Distribution Scatter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-2">색상 (Hue) 분포</h4>
        <p className="text-sm text-gray-600 mb-4">
          색상환에서 각 색상 패밀리의 Hue 값을 시각화합니다. 0-360도 범위이며,
          비슷한 hue 값을 가진 색상들은 색상환에서 가깝게 위치합니다.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="index"
              name="색상 단계"
              label={{ value: "색상 단계", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="hue"
              name="Hue"
              domain={[0, 360]}
              label={{ value: "Hue (도)", angle: -90, position: "insideLeft" }}
            />
            <ZAxis range={[60, 60]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            {Object.entries(colorsByFamily).map(([family, colors]) => (
              <Scatter
                key={family}
                name={family}
                data={colors.map((c, i) => ({
                  index: i,
                  hue: c.hue ?? 0,
                  name: c.name,
                }))}
                fill={familyColors[family] || "#666"}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Color Swatches by Family */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-4">색상 견본 (Color Swatches)</h4>
        {Object.entries(colorsByFamily).map(([family, colors]) => (
          <div key={family} className="mb-8">
            <h5 className="text-lg font-semibold mb-3 capitalize">{family}</h5>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-3">
              {colors.map((color) => (
                <div key={color.name} className="space-y-1">
                  <div
                    className="w-full h-16 rounded border-2 border-gray-200"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                  <div className="text-xs text-center">
                    <div className="font-mono text-gray-500">{color.name.split("-")[1]}</div>
                    <div className="text-gray-400">L:{(color.lightness * 100).toFixed(0)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
