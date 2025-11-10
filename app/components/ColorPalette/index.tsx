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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            색상 팔레트 분석
          </h1>
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-gray-900">{allColors.length}</div>
            <div className="text-gray-600">총 색상 수</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="text-3xl font-bold text-gray-900">
              {colorFamilies.length}
            </div>
            <div className="text-gray-600">색상 패밀리</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="text-3xl font-bold text-gray-900">OKLCH</div>
            <div className="text-gray-600">색상 공간</div>
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
                ⚠️ 한계 및 개선 방향
              </h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>브라우저 지원</strong>: OKLCH는 최신 브라우저에서만
                  지원되며, 구형 브라우저를 위한 fallback이 필요할 수 있음
                </li>
                <li>
                  <strong>디자인 도구 통합</strong>: Figma, Adobe XD 등 주요 디자인
                  도구에서 OKLCH 지원이 제한적이어서 디자이너와의 협업에 어려움이
                  있을 수 있음
                </li>
                <li>
                  <strong>실시간 검증</strong>: 현재는 빌드 타임에만 색상 변환이
                  이루어지므로, 개발 중 실시간으로 대비를 확인하는 기능이 필요
                </li>
                <li>
                  <strong>색상 조합 추천</strong>: 단순 검증을 넘어, APCA 기준을
                  만족하는 색상 조합을 자동으로 추천하는 기능이 있으면 더 유용할 것
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🎯 Serok UI 철학과의 정합성
              </h3>
              <p className="mb-2">
                이 색상 분석 시스템은 Serok UI의 핵심 철학을 충실히 반영합니다:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>"검증된 기반 위에 구축"</strong>: Adobe Leonardo와 culori
                  같은 업계 표준 라이브러리를 활용하여, 직접 구현의 위험을 피하고
                  안정성 확보
                </li>
                <li>
                  <strong>"접근성을 자연스럽게"</strong>: APCA 분석을 통해 접근성이
                  사후 검토가 아닌 설계 단계부터 고려되도록 함
                </li>
                <li>
                  <strong>"제한된 리소스 존중"</strong>: 복잡한 색상 이론을 직접
                  구현하지 않고, 기존 도구를 조합하여 효율적으로 목표 달성
                </li>
                <li>
                  <strong>"copy-paste 가능"</strong>: 색상 토큰이 CSS 변수로
                  출력되어, 어떤 프로젝트든 쉽게 복사하여 사용 가능
                </li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-purple-500">
              <p className="text-sm italic text-gray-700">
                "완벽한 색상 시스템을 처음부터 만드는 대신, 입증된 도구들을
                조합하여 실용적인 솔루션을 구축했습니다. 이것이 바로 Serok UI의
                방식입니다 - 똑똑하게 빌리고, 현명하게 통합하며, 접근 가능하게
                제공하는 것."
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
