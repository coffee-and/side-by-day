# Side by Day

혼자서 일정·할 일·메모·D-Day를 관리하고, 필요할 때 친구와 공간을 공유할 수 있도록 확장하는 모바일 우선 생활관리 앱입니다.

## 현재 구현

- 오늘 화면에서 오늘 일정·할 일·고정 메모·D-Day 확인
- 실제 현재 날짜를 기준으로 한 월간 캘린더
- 이전 달·다음 달 이동 및 오늘로 이동
- 월 제목 클릭 → 12개월 전체 보기
- 연도 클릭 → 현재 연도 앞뒤를 포함한 10개 연도 보기
- 날짜 선택 및 선택한 날짜 상세 정보
- 대한민국 공휴일·대체공휴일·선거일 표시
- 주요 국가기념일·생활기념일 표시
- 한국 음력 날짜와 간지 표시
- 일정 생성·편집·삭제, 종일·시간·메모·반복/알림 준비 필드
- 할 일 생성·편집·삭제·완료·완료 취소와 날짜 필터
- 메모 생성·편집·삭제·검색·고정과 날짜 연결
- D-Day 생성·편집·삭제·고정, 카운트다운·카운트업
- `MY DIARY` 기본 개인 작업공간과 `TOGETHER DIARY · COMING LATER` 진입점
- 모바일·태블릿·데스크톱 전용 작업공간 배치
- 흰색 기반 라이트 테마와 검정색 기반 다크 테마
- 상단 단일 아이콘 버튼으로 라이트·다크 순환 전환
- 일정별 선명한 컬러 밑줄 또는 테두리 없는 컬러 박스 표현
- 날짜별 대표 아이콘 1개 표시
- 월간 셀 높이를 넘는 일정은 저장 개수와 관계없이 `…`로 생략 표시
- `TODAY / CALENDAR / TO DO / NOTES` 화면 전환
- Supabase 이메일 회원가입·로그인·로그아웃
- 로그인 세션 유지와 보호된 다이어리 진입
- 비밀번호 재설정 메일과 새 비밀번호 등록

로그인은 Supabase Auth와 연결됩니다. 일정·할 일·메모·D-Day 데이터는 로그인 사용자별로 분리된 브라우저 로컬 저장소와 예시 데이터로 동작하며, 여러 기기 동기화·친구 초대·공유 권한은 아직 포함하지 않습니다.

## 제품 구조

- 앱은 친구 초대 없이도 사용할 수 있는 `MY DIARY`를 기본으로 시작합니다.
- 일정·할 일·메모·D-Day는 모두 `spaceId`를 가져 같은 데이터 모델로 개인 다이어리와 공유 다이어리를 처리합니다.
- 현재는 `personal` 공간만 사용하며, 향후 친구 초대 시 `shared` 공간을 추가합니다.
- 공유 기능을 위해 개인용 기능을 별도로 복제하지 않습니다.

## 달력 데이터 범위

- 공식 공휴일 데이터: 현재 설치된 데이터 패키지 기준 `2018–2027년`
- 주요 기념일: 앱 내부의 교체 가능한 목록으로 관리
- 음력 변환: 패키지가 지원하는 한국 음력 범위 안에서 제공

공식 공휴일 데이터가 없는 연도를 선택하면 빈 날짜로 단정하지 않고 지원 범위를 화면에 안내합니다. 앞으로 공공데이터 API나 갱신된 연도별 데이터로 공급자만 교체할 수 있도록 서비스 계층을 분리했습니다.

## 디자인 구조

- 앱 테마는 `light | dark` 두 값만 사용합니다.
- 테마 상태는 `useTheme`, 버튼 표현은 공용 `ThemeToggle` 컴포넌트가 담당합니다.
- 일정 꾸미기는 `EventAppearance`의 `underline | fill` 두 표현 방식과 색상 데이터로 관리합니다.
- 밑줄형은 배경과 외곽선 없이 선명한 하단 컬러만 사용합니다.
- 컬러 박스형은 외곽선 없이 배경색과 진한 글씨만 사용합니다.
- 날짜 아이콘은 `CalendarDayDecoration`으로 분리해 한 날짜에 하나만 유지합니다.
- 월간 화면에서는 실제 셀 높이를 측정해 표시 가능한 일정만 렌더링하고 초과분을 `…`로 표시합니다.
- 기능 변경은 기존 소유 컴포넌트와 공용 토큰에서 처리하며 중복 구현이나 후행 CSS 덮어쓰기를 두지 않습니다.

## 구조

```text
src/
├─ features/calendar/
│  ├─ components/       # 월간·전체 월·연도·날짜 상세·일정 라벨 UI
│  ├─ hooks/            # 화면 전환과 날짜 선택 상태
│  ├─ lib/              # 순수 날짜 계산 유틸리티
│  ├─ services/         # 음력·대한민국 공휴일 공급자
│  └─ CalendarWorkspace.tsx
├─ features/layout/     # 모바일·태블릿·데스크톱 레이아웃 소유자
├─ features/events/     # 중앙 일정 컬러 팔레트
├─ features/workspace/
│  ├─ components/       # 오늘·할 일·메모 화면과 공용 편집기
│  └─ hooks/            # spaceId 기반 공용 상태와 CRUD
├─ components/          # 앱 공용 UI, 테마 버튼, 날짜 카운터
├─ data/                # 현재는 로컬 예시 데이터
├─ hooks/               # 공용 라이트·다크 테마 상태
└─ styles/              # 토큰·테마·공용·작업공간 스타일
```

구현 세부 규칙과 반응형 와이어프레임은 [docs/DIARY_WORKSPACE_SPEC.md](./docs/DIARY_WORKSPACE_SPEC.md)를 확인하세요.

## 실행

Supabase 프로젝트의 API URL과 publishable key를 `.env.local`에 설정합니다. `service_role` 또는 secret key는 브라우저 앱에 넣지 않습니다.

```bash
cp .env.example .env.local
```

```dotenv
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
```

Supabase Auth URL Configuration에는 다음 주소를 등록합니다.

- Site URL: `https://coffee-and.github.io/side-by-day/`
- Redirect URLs: `http://localhost:5173/side-by-day/`, `https://coffee-and.github.io/side-by-day/`

GitHub Pages 배포에는 저장소 Actions Variables의 `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`를 사용합니다.

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
