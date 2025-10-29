import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Link } from 'react-router';
import { baseOptions } from '~/lib/layout.shared';
import { Button } from '@/lib/ui/Button';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'Serok UI - 현대적인 컴포넌트 라이브러리' },
    { name: 'description', content: 'React Spectrum 기반의 접근성 있고 아름다운 컴포넌트 라이브러리' },
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
      <div className="flex flex-col items-center justify-center text-center flex-1 space-y-12 py-12">
        {/* Hero Section */}
        <div className="space-y-6 max-w-2xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">
            Serok UI
          </h1>
          <p className="text-lg text-fd-muted-foreground">
            React Spectrum 기반의 접근성 있는 컴포넌트. shadcn/ui와 호환되어 빠르게 시작할 수 있습니다.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-sm">
              <span>🎯</span> React Spectrum 기반
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-sm">
              <span>⚡</span> shadcn/ui 호환
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="accent"
              size="l"
              style="fill"
              href="/docs/installation"
            >
              시작하기
            </Button>
            <Button
              variant="secondary"
              size="l"
              style="outline"
              href="/docs/components/button"
            >
              컴포넌트 보기
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-6 max-w-4xl px-4 py-8 w-full">
          <h2 className="text-3xl font-bold">왜 Serok UI를 선택할까요?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* React Spectrum Section */}
            <div className="p-8 rounded-lg border-2 border-accent/50 bg-gradient-to-br from-accent/5 to-transparent">
              <div className="space-y-4">
                <div className="text-4xl">♿</div>
                <h3 className="font-bold text-xl text-left">React Spectrum 기반</h3>
                <p className="text-fd-muted-foreground text-sm text-left">
                  Adobe의 React Spectrum을 기반으로 엔터프라이즈급 접근성을 제공합니다. 모든 컴포넌트는 WAI-ARIA를 준수하며 완전한 키보드 네비게이션과 스크린 리더 지원을 제공합니다.
                </p>
                <ul className="text-sm text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>WCAG 2.1 AA 준수</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>완전한 키보드 지원</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>스크린 리더 호환</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* shadcn/ui Section */}
            <div className="p-8 rounded-lg border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/5 to-transparent">
              <div className="space-y-4">
                <div className="text-4xl">⚡</div>
                <h3 className="font-bold text-xl text-left">shadcn/ui 호환</h3>
                <p className="text-fd-muted-foreground text-sm text-left">
                  shadcn/ui 워크플로우로 바로 복사-붙여넣기 가능합니다. 종속성 없이 완전히 제어하고 자유롭게 커스터마이징할 수 있습니다.
                </p>
                <ul className="text-sm text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span>복사-붙여넣기 가능</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span>완전한 소스 제어</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span>런타임 종속성 없음</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Feature */}
          <div className="p-6 rounded-lg border border-border bg-fd-card">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-lg mb-2">완전히 커스터마이징 가능</h3>
            <p className="text-fd-muted-foreground text-sm">
              CSS 변수를 사용해 색상, 크기, 스타일을 자유롭게 커스터마이징할 수 있습니다. 모든 컴포넌트는 당신의 디자인 시스템과 완벽하게 통합되도록 설계되었습니다.
            </p>
          </div>
        </div>

        {/* Components Preview Section */}
        <div className="space-y-8 max-w-4xl px-4 py-8 w-full">
          <div>
            <h2 className="text-3xl font-bold mb-2">사용 가능한 컴포넌트</h2>
            <p className="text-fd-muted-foreground">우리의 UI 컴포넌트 모음으로 빠르게 시작하세요</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {components.map((component) => (
              <Link
                key={component.name}
                to={`/docs/components/${component.name.toLowerCase()}`}
                className="p-4 rounded-lg border border-border bg-fd-card hover:bg-fd-accent/10 transition-colors group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {component.icon}
                </div>
                <h4 className="font-semibold text-sm mb-1">{component.name}</h4>
                <p className="text-xs text-fd-muted-foreground">{component.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Installation Preview Section */}
        <div className="space-y-6 max-w-2xl px-4 py-8 w-full text-left">
          <h2 className="text-3xl font-bold text-center">빠른 시작</h2>
          <div className="bg-fd-card border border-border rounded-lg p-6">
            <p className="text-sm text-fd-muted-foreground mb-4">한 가지 명령어로 테마를 설치하세요:</p>
            <code className="block bg-black/50 text-green-400 p-4 rounded text-sm overflow-x-auto">
              npx shadcn@latest add https://simyunsup.github.io/serok-ui/r/provider.json
            </code>
          </div>
          <div className="text-center">
            <Button
              variant="accent"
              style="outline"
              onPress={() => window.location.href = '/docs/installation'}
            >
              전체 문서 읽기
            </Button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
