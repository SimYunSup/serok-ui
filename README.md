# Serok UI

> React Spectrum 기반의 접근성 있는 컴포넌트 라이브러리

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 소개

**Serok UI**는 현대적인 디자인 시스템입니다. Adobe의 React Spectrum을 기반으로 하여 동아리 프로젝트에서도 빠르고 효과적으로 구축할 수 있도록 설계했으며, shadcn/ui 스타일의 복사-붙여넣기 방식으로 자유롭게 커스터마이징할 수 있습니다.

"새록(Serok)"은 새로운 싹이 돋아나는 모습을 뜻하는 우리말입니다. 파릇파릇한 색감으로 신선하고 현대적인 UI를 제공합니다.

## 🎯 우리가 소중히 여기는 것들

### 이미 좋은 것을 다시 만들지 않기

누군가는 이미 색상, 접근성, 컴포넌트 구조를 고민해서 만들어놨습니다. Adobe의 React Spectrum이 바로 그것입니다. 우리는 이걸 존중하고, 이를 바탕으로 우리의 색깔을 더하기로 했어요.

WCAG 2.1 AA 준수? 이건 우리가 "꼭 해야겠다"고 목표했던 게 아니라, 이미 잘 만들어진 기초 위에 앉으면 자연스럽게 따라오는 결과입니다.

### 우리가 가진 시간과 인력을 현명하게 쓰기

동아리 프로젝트입니다. 모두가 바쁘고, 모두가 자기 일이 많아요. 그래서 우리는 선택해야 했습니다.

"최신 기술을 배우면서 스타일링을 구축할 건가?" vs "이미 검증된 기초를 쓰고 우리가 할 수 있는 일에 집중할 건가?"

우리는 후자를 택했습니다. 그래야 실제로 좋은 컴포넌트를 만들 수 있으니까요.

### 당신의 프로젝트에 맞게 쓸 수 있도록

컴포넌트를 가져다가 번들 크기 때문에 걱정할 필요 없게 하고 싶었어요. 그래서 shadcn/ui처럼 복사-붙여넣기 방식을 선택했습니다.

당신의 코드베이스에 완전히 속하는 컴포넌트들. 색상도, 크기도, 동작도 마음대로 바꿀 수 있어요. CSS 변수를 쓰니까 당신의 디자인 시스템과 쉽게 맞춰갈 수 있습니다.

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
- **Tailwind CSS** - 유틸리티 기반 스타일링으로 빠른 커스터마이징
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

## 🎯 왜 React Spectrum을 선택했는가?

초기 계획 단계에서 우리는 여러 선택지를 검토했습니다.

### React Spectrum S2와 Spectrum Web Components는?

Adobe도 최신 기술로 나아가고 있습니다. React Spectrum S2와 Spectrum Web Components가 그것입니다. 하지만 우리의 상황에선 맞지 않았어요.

S2를 쓰려면 Parcel의 `style macro`를 배워야 하는데, 이게 생각보다 복잡합니다. 팀원들을 온보딩할 때마다 이걸 설명하고 배워야 하는데, 시간이 많이 들어갑니다. Spectrum Web Components는 더 모듈화되어 있지만, 서버사이드 렌더링(SSR) 지원을 아직 우선순위로 두지 않고 있어요. 나중에 필요할 수도 있는데 지금 이걸 쓰면 문제가 될 수 있겠다는 생각이 들었습니다.

결국 우리는 "최신 기술 vs 현실적인 운영"을 비교했고, 동아리 프로젝트라는 제약 속에서 최신 기술의 학습 곡선을 감당할 여유가 없었습니다.

### Radix-UI나 Base-UI 같은 headless UI는?

이것들은 정말 유연합니다. 하지만 유연하다는 건 "너가 다 만들어야 한다"는 뜻이기도 합니다. 디자인 시스템의 색상, 레이아웃, 컴포넌트 구조를 처음부터 모두 정의해야 해요. 이건 엄청난 작업입니다.

우리는 생각했어요. "정말 우리가 이 모든 디자인 의사결정을 직접 해야 할까? 이미 어딘가에서 잘 검증된 디자인이 있지 않을까?" 이미 대규모 조직(구글, 마이크로소프트)에서 검증된 디자인 시스템을 처음부터 다시 만들 필요가 있을까요? 동아리 프로젝트의 시간과 인력으로는 불가능할 것 같았습니다.

### 우리의 선택: React Spectrum S1

결국 우리는 React Spectrum S1을 선택했습니다.

이미 완성된 디자인과 접근성 구현을 차용하면, 우리는 디자인 의사결정에 시간을 낭비하지 않고 "실제로 좋은 컴포넌트를 만드는 데" 집중할 수 있습니다.

- 색상? 이미 입증된 React Spectrum의 팔레트를 씁니다.
- 접근성? ARIA, 키보드 네비게이션, 스크린리더 지원이 이미 구현되어 있습니다.
- 유지관리? Adobe가 계속 업데이트하고 커뮤니티가 지원합니다.

이게 "바퀴를 다시 만들지 않는다"는 우리 철학입니다. 남의 좋은 일을 존경하고, 똑똑하게 차용하는 것. 그게 동아리 프로젝트에서 품질 높은 결과물을 만드는 방법이라고 생각했습니다.

### React Spectrum과의 통합

Serok UI는 Adobe의 React Spectrum을 활용하여 다음을 제공합니다:

- **상태 관리**: 내장된 상태 관리 시스템
- **이벤트 처리**: 통합된 이벤트 핸들러
- **접근성 기능**: ARIA 레이블과 역할 자동 처리
- **다국어 지원**: 국제화 지원 (i18n)


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
- [shadcn/ui](https://ui.shadcn.com/) - 복사-붙여넣기 방식의 컴포넌트 배포 아이디어
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 기반 스타일링 방식

---

Made with 💚 by the Serok UI team
