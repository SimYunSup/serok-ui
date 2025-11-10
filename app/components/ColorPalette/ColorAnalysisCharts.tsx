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
  BarChart,
  Bar,
} from "recharts";
import type { ColorInfo } from "../../../scripts/colorAnalysis";

interface ColorAnalysisChartsProps {
  colors: ColorInfo[];
  colorFamily?: string;
}

export function ColorAnalysisCharts({ colors, colorFamily }: ColorAnalysisChartsProps) {
  // Prepare data for charts
  const chartData = colors.map((color) => ({
    name: color.name,
    lightness: (color.lightness * 100).toFixed(2),
    chroma: color.chroma.toFixed(4),
    hue: color.hue ?? 0,
    hex: color.hex,
  }));

  return (
    <div className="space-y-8">
      {colorFamily && (
        <h3 className="text-2xl font-bold">{colorFamily} Color Family</h3>
      )}

      {/* Lightness Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">Lightness Distribution</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis domain={[0, 100]} label={{ value: "Lightness (%)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="lightness"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chroma Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">Chroma Distribution</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis label={{ value: "Chroma", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="chroma" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Hue Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">Hue Distribution</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis domain={[0, 360]} label={{ value: "Hue (degrees)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="hue"
              stroke="#ffc658"
              strokeWidth={2}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Color Swatches */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">Color Swatches</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div
                className="w-full h-24 rounded-lg border-2 border-gray-300"
                style={{ backgroundColor: color.hex }}
              />
              <div className="text-sm">
                <div className="font-semibold">{color.name}</div>
                <div className="text-gray-600 font-mono text-xs">{color.hex}</div>
                <div className="text-gray-500 text-xs">
                  L: {(color.lightness * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
