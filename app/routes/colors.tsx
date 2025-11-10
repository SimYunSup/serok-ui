import { ColorAnalysisCharts } from "~/components/ColorPalette/ColorAnalysisCharts";
import { APCAContrastTable } from "~/components/ColorPalette/APCAContrastTable";
import { analyzeColorTokens, groupColorsByFamily } from "../../scripts/colorAnalysis";
import colorTokens from "../../tokens/colors.json";

export default function ColorsPage() {
  // Analyze all color tokens
  const allColors = analyzeColorTokens(colorTokens);
  const colorsByFamily = groupColorsByFamily(allColors);

  // Get color families
  const colorFamilies = Object.keys(colorsByFamily).sort();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Color Palette Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Color palette analysis showing lightness, chroma, hue distributions, and APCA
            contrast compliance for the Serok UI design system.
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              About OKLCH Color Space
            </h3>
            <p className="text-sm text-blue-800">
              All colors in this design system are now using the{" "}
              <strong>OKLCH color space</strong>, which provides perceptually uniform
              lightness and improved color interpolation compared to RGB or HSL.
            </p>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-gray-900">{allColors.length}</div>
            <div className="text-gray-600">Total Colors</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-gray-900">
              {colorFamilies.length}
            </div>
            <div className="text-gray-600">Color Families</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-gray-900">OKLCH</div>
            <div className="text-gray-600">Color Space</div>
          </div>
        </div>

        {/* Color Families Analysis */}
        {colorFamilies.map((family) => {
          const colors = colorsByFamily[family];
          return (
            <div key={family} className="mb-16">
              <ColorAnalysisCharts colors={colors} colorFamily={family} />

              {/* APCA Contrast Tables for common backgrounds */}
              <div className="mt-8 space-y-8">
                <APCAContrastTable
                  colors={colors}
                  backgroundColor="#ffffff"
                  backgroundName="White (#ffffff)"
                />
                <APCAContrastTable
                  colors={colors}
                  backgroundColor="#000000"
                  backgroundName="Black (#000000)"
                />
                {family === "gray" && colors.length > 0 && (
                  <APCAContrastTable
                    colors={colors}
                    backgroundColor={colors[Math.floor(colors.length / 2)].hex}
                    backgroundName={`${family} mid-tone`}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* OKLCH Information */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Understanding OKLCH</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>OKLCH</strong> is a perceptually uniform color space that represents
              colors using three components:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>L (Lightness)</strong>: 0-100%, represents the perceived
                brightness of the color
              </li>
              <li>
                <strong>C (Chroma)</strong>: 0-0.4+, represents the colorfulness or
                saturation
              </li>
              <li>
                <strong>H (Hue)</strong>: 0-360°, represents the color angle (red, yellow,
                green, blue, etc.)
              </li>
            </ul>
            <p className="mt-4">
              <strong>Benefits of OKLCH:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Perceptually uniform lightness across all hues</li>
              <li>Better color interpolation and gradients</li>
              <li>More accurate color contrast calculations</li>
              <li>Wider color gamut support for modern displays</li>
            </ul>
          </div>
        </div>

        {/* APCA Information */}
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Understanding APCA</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>APCA (Accessible Perceptual Contrast Algorithm)</strong> is a modern
              contrast calculation method that provides more accurate readability
              predictions than traditional WCAG 2.x contrast ratios.
            </p>
            <p className="mt-4">
              <strong>APCA Contrast Levels (Lc values):</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Body Text (≥75 Lc)</strong>: Required for normal-sized text content
              </li>
              <li>
                <strong>Large Text (≥60 Lc)</strong>: Suitable for headings and larger UI
                text
              </li>
              <li>
                <strong>UI Components (≥45 Lc)</strong>: Minimum for non-text elements like
                icons and borders
              </li>
            </ul>
            <p className="mt-4">
              Learn more about APCA at{" "}
              <a
                href="https://git.apcacontrast.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                git.apcacontrast.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
