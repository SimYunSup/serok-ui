# Serok UI

> React Spectrum 기반의 접근성 있는 컴포넌트 라이브러리

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 소개

**Serok UI**는 Adobe React Spectrum을 한국어로 쉽게 사용할 수 있도록 만든 컴포넌트 라이브러리입니다.

React Spectrum은 검증된 접근성과 완성도 높은 디자인을 제공하지만, 영어 문서와 복잡한 설치 과정이 진입 장벽이 될 수 있습니다. Serok UI는 이 문제를 해결합니다:

- **한국어 문서**: 모든 컴포넌트를 실용적인 예제와 함께 한국어로 설명
- **간편한 설치**: shadcn/ui 스타일의 복사-붙여넣기 방식으로 필요한 컴포넌트만 설치
- **커스터마이징 가이드**: React Spectrum의 CSS 변수 체계를 체계적으로 문서화

"새록(Serok)"은 새로운 싹이 돋아나는 모습을 뜻하는 우리말입니다.

## 🎯 설계 원칙

### 검증된 기반 위에 구축하기

Adobe React Spectrum은 이미 색상, 접근성, 컴포넌트 구조를 체계적으로 설계했습니다. 우리는 이를 존중하고, 그 위에 한국어 사용자를 위한 편의성을 더합니다.

React Spectrum의 **접근성 기초(ARIA, 키보드 네비게이션, 스크린리더 지원)는 이미 탄탄합니다**. 우리는 이를 유지하면서 사용 편의성을 개선하는 데 집중합니다.

### 실용성과 편의성 우선

React Spectrum을 직접 사용하려면 영어 문서를 읽고, 복잡한 패키지 구조를 이해해야 합니다. Serok UI는 이 진입 장벽을 낮춥니다:

- **한국어 문서**: 영어 장벽 없이 바로 시작
- **shadcn 스타일 설치**: 필요한 컴포넌트만 복사-붙여넣기로 설치
- **실용적 예제**: 실제 프로젝트에서 바로 쓸 수 있는 코드

### 투명한 커스터마이징

복사-붙여넣기 방식이므로 컴포넌트가 완전히 당신의 코드베이스에 속합니다. React Spectrum의 CSS 변수 체계를 그대로 활용하므로, 원하는 대로 스타일을 수정할 수 있습니다.

단, **React Spectrum의 디자인을 크게 바꾸는 건 권장하지 않습니다**. 접근성과 일관성을 유지하기 위해서입니다.

## 🚀 시작하기

### 설치

#### 방법 1: 네임스페이스 사용 (권장)

`components.json`에 `registries`를 추가하면 간단하게 설치할 수 있습니다:

```json
{
  "registries": {
    "@serok": "https://serok.ethansup.net/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @serok/provider
npx shadcn@latest add @serok/button
```

#### 방법 2: URL 직접 사용

```bash
npx shadcn@latest add https://serok.ethansup.net/r/provider.json
npx shadcn@latest add https://serok.ethansup.net/r/button.json
```

자세한 설치 방법은 [공식 문서](https://serok.ethansup.net/docs/start/install)를 참고하세요.

### 기본 사용

```tsx
import { Button } from '@/lib/ui/Button';

export default function MyComponent() {
  return (
    <Button variant="accent" size="L">
      클릭하세요
    </Button>
  );
}
```


## 🛠️ 설계 선택과 기술 스택

### 핵심 선택
- **React 19+** - 최신 기능과 성능 최적화 (기본적으로 쓰는 라이브러리)
- **React Spectrum** - 검증된 접근성과 디자인 시스템 (위에서 설명한 선택)
- **TypeScript** - 타입 안정성으로 버그 감소와 개발자 경험 향상

### 개발 경험 향상
- **React Router** - 모던 라우팅으로 SPA 구축
- **pnpm** - 빠르고 효율적인 패키지 관리

### 문서화와 배포
- **Fumadocs** - 마크다운 기반 문서 생성으로 간편한 유지관리
- **shadcn registry** - 컴포넌트를 쉽게 설치하고 커스터마이징 가능

## 📋 요구사항

- Node.js 18+
- React 19+
- TypeScript 5.0+ (권장)

## 💻 개발 환경 설정

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 시작

```bash
pnpm dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
pnpm build:docs
```

### 타입 체크

```bash
pnpm typecheck
```

### 린트

```bash
pnpm lint
```

## 📚 문서

공식 문서 및 컴포넌트 가이드는 다음 링크에서 확인할 수 있습니다:

- [문서 사이트](https://serok.ethansup.net)
- [컴포넌트 가이드](https://serok.ethansup.net/docs/components)
- [설치 가이드](https://serok.ethansup.net/docs)

## 🎯 왜 React Spectrum인가?

초기 계획 단계에서 우리는 여러 선택지를 검토했습니다.

### shadcn/ui + Radix는 어떤가요?

shadcn/ui는 훌륭합니다. Radix UI(headless) 위에 Tailwind CSS 스타일을 얹어 완성도 높은 컴포넌트를 제공합니다.

하지만 shadcn/ui를 기반으로 **한국어 문서**를 만드는 것만으로는 충분한 차별점이 없다고 판단했습니다. 이미 shadcn/ui 자체가 잘 만들어져 있고, 영어 문서도 충분히 명확하기 때문입니다.

### React Spectrum의 장점

React Spectrum은 다른 선택지보다 더 많은 것을 제공합니다:

- **검증된 디자인**: Adobe Spectrum 디자인 시스템 기반 (일관성 있는 색상, 간격, 타이포그래피)
- **강력한 접근성**: ARIA, 키보드 네비게이션, 스크린리더 지원이 기본 내장
- **안정적인 유지관리**: Adobe가 지속적으로 업데이트하고 지원

반면 **진입 장벽**도 있습니다:

- ❌ 영어 문서만 제공
- ❌ 복잡한 패키지 구조 (@react-spectrum, @react-aria, @react-stately 분리)
- ❌ 설치 및 설정이 상대적으로 복잡

**Serok UI는 바로 이 진입 장벽을 해결합니다.**

### React Spectrum S2와 Web Components는?

Adobe는 React Spectrum S2(Parcel style macro 사용)와 Spectrum Web Components를 개발 중입니다.

하지만 우리의 상황에는 맞지 않았습니다:

- **S2**: Parcel의 `style macro` 학습 곡선이 가파릅니다. 팀 온보딩 비용이 큽니다.
- **Web Components**: [SSR 지원이 아직 우선순위가 아닙니다](https://github.com/adobe/spectrum-web-components/issues/2675). 나중에 필요할 수 있습니다.

결국 **React Spectrum S1**(안정적, 검증됨)을 선택했습니다.

### Serok UI의 실제 가치

React Spectrum을 직접 사용하는 것과 Serok UI의 차이:

| | React Spectrum 직접 사용 | Serok UI |
|---|---|---|
| **문서** | 영어만 제공 | 한국어 + 실용적 예제 |
| **설치** | 복잡한 패키지 구조 | shadcn 스타일 간편 설치 |
| **스타일링** | 공식 문서가 부족 | CSS 변수 체계 완전 문서화 |
| **진입 장벽** | 높음 | 낮음 |
| **접근성** | 기본 제공 | 동일 (유지) |
| **디자인** | Adobe Spectrum | 동일 (일부 색상만 수정) |

**Serok UI = React Spectrum + 한국어 사용자를 위한 편의성**


## 📄 라이선스

MIT License © 2025. 자유롭게 사용, 수정, 배포할 수 있습니다.

## 📞 지원

문제가 발생하거나 질문이 있으시면:

1. [공식 문서](https://serok.ethansup.net)를 먼저 확인해주세요
2. [Issues](https://github.com/simyunsup/serok-ui/issues)에서 기존 이슈를 검색해주세요
3. 새로운 이슈를 등록해주세요

## 🙏 감사의 말

이 프로젝트는 오픈소스 커뮤니티의 좋은 아이디어와 기술을 바탕으로 합니다:

- [Adobe React Spectrum](https://react-spectrum.adobe.com/) - 검증된 접근성과 디자인 시스템의 기초
- [shadcn/registry](https://ui.shadcn.com/docs/registry) - 복사-붙여넣기 방식의 컴포넌트 배포 아이디어

---

Made with 💚 by the Serok UI team
