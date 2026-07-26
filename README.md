# Side by Day

친구와 커플이 함께 쓰는 모바일 우선 공유 캘린더입니다.

## 현재 구현

- 실제 현재 날짜를 기준으로 한 월간 캘린더
- 이전 달·다음 달 이동
- 월 제목 클릭 → 12개월 전체 보기
- 연도 클릭 → 현재 연도 앞뒤를 포함한 10개 연도 보기
- 날짜 선택 및 선택한 날짜 상세 정보
- 대한민국 공휴일·대체공휴일·주요 법정기념일 표시
- 한국 음력 날짜와 간지 표시
- 나·상대·함께 일정 구분
- 날짜 카운트업·카운트다운
- 내추럴·심플·큐트·다크 테마
- 모바일 하단 내비게이션과 PWA 기본 메타데이터

## 구조

```text
src/
├─ features/calendar/
│  ├─ components/       # 월간·전체 월·연도·날짜 상세 UI
│  ├─ hooks/            # 화면 전환과 날짜 선택 상태
│  ├─ lib/              # 순수 날짜 계산 유틸리티
│  ├─ services/         # 음력·대한민국 공휴일 공급자
│  ├─ CalendarWorkspace.tsx
│  └─ types.ts
├─ components/          # 앱 공용 UI와 날짜 카운터
├─ data/                # 현재는 로컬 예시 데이터
├─ hooks/               # 공용 테마 상태
└─ styles/              # 토큰·테마·공용 컴포넌트 스타일
```

외부 캘린더나 네이티브 캘린더 연동 시 `CalendarEventSource`와 캘린더 서비스 계층을 확장하도록 구성했습니다.

## 실행

```bash
npm ci
npm run dev
```

## 빌드

```bash
npm run build
```

`main` 브랜치에 반영되면 GitHub Actions가 GitHub Pages로 자동 배포합니다.

## 라이선스 고지

외부 패키지와 데이터 라이선스는 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)를 확인하세요.
