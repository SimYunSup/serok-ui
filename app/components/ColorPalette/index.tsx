import { UnifiedColorCharts } from "~/components/ColorPalette/UnifiedColorCharts";
import { APCAContrastTable } from "~/components/ColorPalette/APCAContrastTable";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { analyzeColorTokens, groupColorsByFamily } from "~/lib/utils/colorAnalysis";
import colorTokens from "../../../tokens/colors.json";

export default function ColorsPage() {
  // Analyze all color tokens
  const allColors = analyzeColorTokens(colorTokens);
  const colorsByFamily = groupColorsByFamily(allColors);

  // Get color families sorted
  const colorFamilies = Object.keys(colorsByFamily).sort();

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Unified Color Analysis Charts */}
        <div className="mb-16">
          <UnifiedColorCharts colorsByFamily={colorsByFamily} />
        </div>

        {/* APCA Contrast Analysis with Tabs */}
        <div className="mb-16">
          <Tabs items={colorFamilies}>
            {colorFamilies.map((family) => {
              const colors = colorsByFamily[family];
              return (
                <Tab key={family} value={family}>
                  <div className="space-y-8 pt-4">
                    <h3 className="text-xl font-semibold capitalize mb-4">{family}</h3>
                    <APCAContrastTable
                      colors={colors}
                      backgroundColor="#ffffff"
                      backgroundName="흰색 배경 (#ffffff)"
                    />
                    <APCAContrastTable
                      colors={colors}
                      backgroundColor="#000000"
                      backgroundName="검은색 배경 (#000000)"
                    />
                    {family === "gray" && colors.length > 0 && (
                      <APCAContrastTable
                        colors={colors}
                        backgroundColor={colors[Math.floor(colors.length / 2)].hex}
                        backgroundName={`${family} 중간톤`}
                      />
                    )}
                  </div>
                </Tab>
              );
            })}
          </Tabs>
        </div>

      </div>
    </div>
  );
}
