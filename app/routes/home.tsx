import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Link } from 'react-router';
import { baseOptions } from '~/lib/layout.shared';
import { Button } from '@/lib/ui/Button';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'Serok UI - 현대적인 컴포넌트 라이브러리' },
    { name: 'description', content: 'React Spectrum 기반의 접근성 있고 아름다운 컴포넌트 라이브러리' },
    { property: 'og:title', content: 'Serok UI - 현대적인 컴포넌트 라이브러리' },
    { property: 'og:description', content: 'React Spectrum 기반의 접근성 있고 아름다운 컴포넌트 라이브러리' },
    { property: 'og:image', content: '/og.png' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: '/og.png' },
  ];
}

export default function Home() {
  const components = [
    { name: 'Button', icon: '🔘', description: '다양한 스타일의 버튼' },
    { name: 'Input', icon: '📝', description: '유효성 검사가 있는 입력 필드' },
    { name: 'Checkbox', icon: '☑️', description: '접근성 있는 체크박스' },
    { name: 'Switch', icon: '🔄', description: '토글 스위치' },
    { name: 'Select', icon: '📋', description: '드롭다운 선택 메뉴' },
  ];

  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-20 md:py-32 px-4 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent dark:from-green-500/10 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 dark:border-green-500/30 bg-green-500/5 dark:bg-green-500/10">
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">✨ 새로운 설계 시스템</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Serok UI
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                React Spectrum 기반의 접근성 있는 컴포넌트 라이브러리.
                <br className="hidden sm:block" />
                shadcn/ui와 완벽하게 호환되며, 아름답고 빠르게 구축할 수 있습니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                elementType="a"
                variant="accent"
                size="l"
                style="fill"
                href={`/docs/start/install`}
              >
                시작하기 →
              </Button>
              <Button
                elementType="a"
                variant="secondary"
                size="l"
                style="fill"
                href={`/docs/components/button`}
              >
                컴포넌트 보기
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">React Spectrum 기반</span> 컴포넌트
              </div>
              <div className="w-px bg-gray-200 dark:bg-gray-700" />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">완전한</span> TypeScript 지원
              </div>
              <div className="w-px bg-gray-200 dark:bg-gray-700" />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">WCAG 2.1</span> 준수
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight dark:text-gray-100">기술 선정의 이유</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-500/50 hover:bg-green-50/30 dark:hover:bg-green-950/20 transition-all duration-300">
                <div className="text-5xl mb-4">♿</div>
                <h3 className="text-xl font-bold mb-3 dark:text-gray-100">접근성 우선</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Adobe의 React Spectrum 기반으로 엔터프라이즈급 접근성을 제공합니다. WCAG 2.1 AA 준수, 완전한 키보드 지원, 스크린 리더 호환.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-500/50 hover:bg-green-50/30 dark:hover:bg-green-950/20 transition-all duration-300">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 dark:text-gray-100">복사-붙여넣기</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  shadcn/ui 스타일의 복사-붙여넣기 방식. 번들에 추가되지 않으며, 당신의 코드베이스에 완전히 통합되어 자유롭게 커스터마이징할 수 있습니다.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-500/50 hover:bg-green-50/30 dark:hover:bg-green-950/20 transition-all duration-300">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-3 dark:text-gray-100">완전히 커스터마이징 가능</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  CSS 변수를 사용해 색상, 크기, 스타일을 자유롭게 변경하세요. 당신의 디자인 시스템과 완벽하게 통합됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OG Image Preview Section */}
        <div className="py-12 px-4 flex justify-center dark:bg-gray-950">
          <div className="max-w-2xl w-full rounded-xl border-2 border-green-500/30 dark:border-green-500/20 bg-gradient-to-br from-green-50 dark:from-green-950/30 to-transparent p-4 overflow-hidden">
            <img
              src="/og.png"
              alt="Serok UI OG Image"
              className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
        </div>

        {/* Components Preview Section */}
        <div className="py-20 px-4 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight dark:text-gray-100">완벽한 컴포넌트 집합</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                시작하는 데 필요한 모든 필수 컴포넌트를 제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {components.map((component) => (
                <Link
                  key={component.name}
                  to={`/docs/components/${component.name.toLowerCase()}`}
                  className="group relative p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-500/50 hover:shadow-lg hover:bg-green-50/30 dark:hover:bg-green-950/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {component.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-1 dark:text-gray-100">{component.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{component.description}</p>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-lg">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Installation Preview Section */}
        <div className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight dark:text-gray-100">단 한 줄로 시작하세요</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                설정이 거의 필요 없습니다. 바로 시작할 수 있습니다.
              </p>
            </div>

            <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400">터미널</span>
                <button className="text-xs font-semibold text-gray-400 hover:text-gray-300">복사</button>
              </div>
              <code className="text-sm text-green-400 font-mono">
                npx shadcn@latest add <span className="text-blue-400">https://serok.ethansup.net/r/provider.json</span>
              </code>
            </div>

            <div className="text-center">
              <Button
                elementType="a"
                variant="accent"
                size="l"
                style="outline"
                href={`/docs/start/install`}
              >
                설치 가이드 읽기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
