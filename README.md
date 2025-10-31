# Serok UI

> React Spectrum 기반의 접근성 있는 컴포넌트 라이브러리

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 소개

**Serok UI**는 현대적인 디자인 시스템입니다. Adobe의 React Spectrum을 기반으로 하여 엔터프라이즈급 접근성을 제공하면서도, shadcn/ui 스타일의 복사-붙여넣기 방식으로 자유롭게 커스터마이징할 수 있습니다.

"새록(Serok)"은 새로운 싹이 돋아나는 모습을 뜻하는 우리말입니다. 파릇파릇한 색감으로 신선하고 현대적인 UI를 제공합니다.

## ✨ 주요 특징

### ♿ 접근성 우선
- Adobe의 React Spectrum 기반으로 엔터프라이즈급 접근성 제공
- **WCAG 2.1 AA** 준수
- 완전한 키보드 지원
- 스크린 리더 호환

### ⚡ 복사-붙여넣기 방식
- shadcn/ui 스타일의 직관적인 설치 방식
- 번들에 추가되지 않음 - 당신의 코드베이스에 완전히 통합
- 자유롭게 커스터마이징 가능
- 의존성 관리가 간편함

### 🎨 완전히 커스터마이징 가능
- CSS 변수를 사용한 색상, 크기, 스타일 커스터마이징
- 당신의 디자인 시스템과 완벽하게 통합

## 🚀 시작하기

### 설치

단 한 줄의 명령으로 시작할 수 있습니다:

```bash
npx shadcn@latest add https://serok.ethansup.net/r/provider.json
```

설정이 거의 필요 없습니다. 바로 시작할 수 있습니다.

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


## 🛠️ 기술 스택

- **React** 19+ - 사용자 인터페이스 라이브러리
- **React Spectrum** - 접근성 있는 컴포넌트 기반
- **React Router** - 현대적인 라우팅
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **TypeScript** - 완전한 타입 안정성
- **Fumadocs** - 문서 사이트 생성

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

## 🎯 React Spectrum 통합

Serok UI는 Adobe의 React Spectrum을 활용하여 다음을 제공합니다:

- **상태 관리**: 내장된 상태 관리 시스템
- **이벤트 처리**: 통합된 이벤트 핸들러
- **접근성 기능**: ARIA 레이블과 역할 자동 처리
- **다국어 지원**: 국제화 지원 (i18n)


## 📄 라이선스

MIT License © 2024. 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🤝 기여하기

버그 리포트, 기능 제안, 그리고 풀 리퀘스트를 환영합니다!

## 📞 지원

문제가 발생하거나 질문이 있으시면:

1. [공식 문서](https://serok.ethansup.net)를 먼저 확인해주세요
2. [Issues](https://github.com/simyunsup/serok-ui/issues)에서 기존 이슈를 검색해주세요
3. 새로운 이슈를 등록해주세요

## 🙏 감사의 말

- [Adobe React Spectrum](https://react-spectrum.adobe.com/) - 접근성 기반 제공
- [shadcn/ui](https://ui.shadcn.com/) - 복사-붙여넣기 아이디어
- [Tailwind CSS](https://tailwindcss.com/) - 웹상트 스타일링

---

Made with 💚 by the Serok UI team
