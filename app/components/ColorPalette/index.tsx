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
        {/* Header */}
        <div className="mb-12">
          <p className="text-lg text-gray-600 mb-6">
            Serok UI 디자인 시스템의 색상 팔레트에 대한 OKLCH 색상 공간 기반 분석 및
            APCA 대비 검증 결과입니다.
          </p>

          {/* OKLCH Info Banner */}
          <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2 text-lg">
              OKLCH 색상 공간으로의 전환
            </h3>
            <p className="text-blue-800 mb-2">
              Serok UI의 모든 색상은 이제 <strong>OKLCH 색상 공간</strong>을
              사용합니다. OKLCH는 RGB나 HSL 대비 다음과 같은 장점을 제공합니다:
            </p>
            <ul className="list-disc list-inside text-blue-800 space-y-1 ml-4">
              <li>지각적으로 균일한 명도 (Perceptually uniform lightness)</li>
              <li>더 나은 색상 보간 및 그라데이션</li>
              <li>더 정확한 색상 대비 계산</li>
              <li>현대 디스플레이를 위한 넓은 색영역 지원</li>
            </ul>
          </div>
        </div>

        {/* Unified Color Analysis Charts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            통합 색상 분석
          </h2>
          <p className="text-gray-600 mb-6">
            모든 색상 패밀리의 OKLCH 속성을 한눈에 비교할 수 있습니다.
          </p>
          <UnifiedColorCharts colorsByFamily={colorsByFamily} />
        </div>

        {/* APCA Contrast Analysis with Tabs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            APCA 대비 분석
          </h2>
          <p className="text-gray-600 mb-6">
            각 색상 패밀리가 다양한 배경색에 대해 WCAG 3.0 APCA 기준을 만족하는지
            확인합니다. 탭을 클릭하여 각 색상 패밀리의 대비 분석을 확인하세요.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">APCA 임계값 기준</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mt-1 mr-2" />
                <div>
                  <div className="font-semibold">본문 텍스트</div>
                  <div className="text-gray-600">≥ 75 Lc (일반 크기 텍스트)</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mt-1 mr-2" />
                <div>
                  <div className="font-semibold">큰 텍스트</div>
                  <div className="text-gray-600">≥ 60 Lc (제목, 큰 UI 텍스트)</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mt-1 mr-2" />
                <div>
                  <div className="font-semibold">UI 컴포넌트</div>
                  <div className="text-gray-600">≥ 45 Lc (아이콘, 테두리 등)</div>
                </div>
              </div>
            </div>
          </div>

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

        {/* OKLCH Explanation */}
        <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            OKLCH 색상 공간 이해하기
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>OKLCH</strong>는 지각적으로 균일한 색상 공간으로, 세 가지
              구성 요소로 색상을 표현합니다:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>L (Lightness, 명도)</strong>: 0-100%, 색상의 지각적 밝기를
                나타냅니다
              </li>
              <li>
                <strong>C (Chroma, 채도)</strong>: 0-0.4+, 색상의 선명도 또는
                포화도를 나타냅니다
              </li>
              <li>
                <strong>H (Hue, 색상)</strong>: 0-360°, 색상환에서의 각도
                (빨강, 노랑, 초록, 파랑 등)
              </li>
            </ul>
          </div>
        </div>

        {/* APCA Explanation */}
        <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            APCA 대비 알고리즘 이해하기
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>APCA (Accessible Perceptual Contrast Algorithm)</strong>는
              WCAG 2.x의 전통적인 대비율보다 더 정확한 가독성 예측을 제공하는 현대적인
              대비 계산 방법입니다.
            </p>
            <p className="mt-4">
              <strong>APCA 대비 레벨 (Lc 값):</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>본문 텍스트 (≥75 Lc)</strong>: 일반 크기의 텍스트 콘텐츠에
                필요
              </li>
              <li>
                <strong>큰 텍스트 (≥60 Lc)</strong>: 제목 및 큰 UI 텍스트에 적합
              </li>
              <li>
                <strong>UI 컴포넌트 (≥45 Lc)</strong>: 아이콘, 테두리 등 비텍스트
                요소의 최소 기준
              </li>
            </ul>
            <p className="mt-4">
              APCA에 대한 자세한 내용은{" "}
              <a
                href="https://git.apcacontrast.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                git.apcacontrast.com
              </a>
              에서 확인하실 수 있습니다.
            </p>
          </div>
        </div>

        {/* Analysis Section - Aligned with Serok UI Philosophy */}
        <div className="mb-12 bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-lg shadow-md border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            분석 및 고찰
          </h2>

          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ✅ 성과 및 장점
              </h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>검증된 기술 활용</strong>: Adobe Leonardo와 culori 같은
                  입증된 라이브러리를 사용하여 빠르게 OKLCH 전환 및 APCA 검증 구현
                </li>
                <li>
                  <strong>자동화된 분석</strong>: StyleDictionary 변환 파이프라인을
                  통해 hex → OKLCH 변환이 자동으로 이루어지며, 수동 작업 불필요
                </li>
                <li>
                  <strong>시각적 인사이트</strong>: 통합 그래프를 통해 모든 색상
                  패밀리의 명도/채도/색상 분포를 한눈에 파악 가능
                </li>
                <li>
                  <strong>접근성 우선</strong>: APCA 대비 분석으로 WCAG 3.0 기준
                  준수 여부를 체계적으로 검증
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ⚠️ 색상 팔레트의 한계 및 개선 방향
              </h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>불균일한 명도 분포</strong>: 위 그래프에서 확인할 수 있듯이,
                  gray와 yellow 계열의 lightness가 일정한 기울기로 증가하지 않고
                  중간 구간에서 급격한 변화를 보임. 이상적으로는 모든 색상 단계가
                  지각적으로 균일한 간격을 가져야 하지만, 현재는 시각적으로 불균형한
                  느낌을 줄 수 있음
                </li>
                <li>
                  <strong>APCA 기준 미충족 색상 존재</strong>: 색상 팔레트 생성 시
                  APCA 대비를 사전에 고려하지 않아, 일부 색상 조합이 접근성 기준을
                  만족하지 못함. 특히 밝은 색상들은 흰색 배경에서, 어두운 색상들은
                  검은색 배경에서 충분한 대비를 확보하지 못하는 경우가 많음
                </li>
                <li>
                  <strong>체계적 생성 방법론 부재</strong>: 현재 색상 팔레트는
                  수동으로 선택된 hex 값을 기반으로 하며, Adobe Leonardo의 색상
                  생성 기능을 활용하지 않음. 대신 기존 hex 값을 OKLCH로 변환만 하여,
                  색상 간의 관계나 대비가 체계적으로 설계되지 않았음
                </li>
                <li>
                  <strong>시맨틱 컬러 정의 부족</strong>: 단순히 색상 이름(red,
                  blue)과 숫자(100, 200)로만 구성되어 있어, 실제 사용 맥락(primary,
                  danger, success 등)과의 연결이 명확하지 않음. 이는 개발자가 어떤
                  색상을 언제 사용해야 할지 판단하기 어렵게 만듦
                </li>
                <li>
                  <strong>다크 모드 고려 부족</strong>: 현재 팔레트는 라이트 모드를
                  기준으로 설계되었으며, 다크 모드에서의 색상 역할이나 대비에 대한
                  고려가 부족함. OKLCH로 전환했지만, 이를 활용한 자동 다크 모드 색상
                  생성 등의 기능은 구현되지 않음
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🎯 Serok UI 철학과의 정합성
              </h3>
              <p className="mb-2">
                이 색상 분석 시스템과 현재 접근 방식은 Serok UI 철학을 부분적으로
                반영하지만, 개선의 여지도 있습니다:
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-1">✅ 철학 준수 측면</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>
                    <strong>"검증된 기반 위에 구축"</strong>: Adobe Leonardo와 culori
                    같은 업계 표준 라이브러리 활용
                  </li>
                  <li>
                    <strong>"제한된 리소스 존중"</strong>: 복잡한 색상 이론을 직접
                    구현하지 않고, 기존 도구를 조합하여 효율적으로 구현
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">⚠️ 철학 미준수 측면</h4>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>
                    <strong>"접근성을 자연스럽게"</strong>: APCA 분석 도구는 제공하지만,
                    색상 팔레트 자체가 접근성을 <em>사전에</em> 고려하여 설계되지 않음.
                    사후 검증으로는 접근성을 "자연스럽게" 만들었다고 보기 어려움
                  </li>
                  <li>
                    <strong>"검증된 기반 활용의 불완전성"</strong>: Leonardo의 색상
                    생성 기능을 활용하지 않고, 단순히 검증 도구로만 사용. 라이브러리의
                    핵심 가치를 충분히 활용하지 못함
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-purple-500">
              <p className="text-sm italic text-gray-700 mb-2">
                "이 분석 도구는 <strong>현재 색상 팔레트의 문제점을 명확히
                  드러냄</strong>으로써 가치를 제공합니다. 완벽한 색상 시스템을
                구축하지는 못했지만, 무엇이 부족한지 정직하게 보여주는 것 —
                이것 역시 Serok UI의 방식입니다."
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-8 border-t">
          <p>
            Powered by{" "}
            <a
              href="https://github.com/adobe/leonardo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Adobe Leonardo
            </a>
            ,{" "}
            <a
              href="https://culorjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Culori
            </a>
            , and{" "}
            <a
              href="https://recharts.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Recharts
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
