# Side by Day

두 사람이 각자의 일정과 함께하는 날짜를 나란히 기록하는 모바일 우선 공유 캘린더입니다.

## 현재 범위

- React + TypeScript + Vite 기본 구조
- 모바일 우선 반응형 대시보드
- 내추럴, 큐트, 심플, 다크 4개 테마
- 공용 디자인 토큰과 UI 컴포넌트
- `나 / 상대 / 함께` 일정 구분
- 날짜 카운트업·카운트다운 카드
- Mock Data 기반 화면
- GitHub Actions를 통한 GitHub Pages 자동 배포

현재는 UI 뼈대와 로컬 상태 구조에 집중하며 데이터베이스 및 외부 캘린더 연동은 포함하지 않습니다.

## 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## 디자인 시스템

컴포넌트에서는 색상과 간격을 직접 하드코딩하지 않고 `src/styles`의 공용 토큰을 사용합니다.

- `tokens.css`: 간격, 반경, 공통 일정 색상
- `themes.css`: 테마별 의미 기반 색상과 표면 값
- `base.css`: 전역 레이아웃과 타이포그래피
- `components.css`: 공용 UI와 캘린더 컴포넌트 스타일

테마는 루트 요소의 `data-theme` 속성으로 적용되며 사용자의 선택은 `localStorage`에 저장됩니다.

## GitHub Pages

`main` 브랜치에 변경이 푸시되면 `.github/workflows/deploy-pages.yml`이 빌드 결과물을 GitHub Pages에 배포합니다.

저장소 설정의 **Settings → Pages → Build and deployment → Source**가 **GitHub Actions**로 선택되어 있어야 합니다.
