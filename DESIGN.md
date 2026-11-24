# DESIGN.md: Content Aggregator & Feed System

이 문서는 텍스트 중심의 피드와 다중 카테고리 탐색을 효율적으로 처리하기 위한 UI/UX 디자인 시스템을 정의합니다. 높은 정보 밀도를 유지하면서도 시인성을 확보하는 것을 목표로 합니다.

## 1. 색상 팔레트 (Color Palette)

전체적으로 눈의 피로를 줄이는 무채색 베이스 위에, 시그니처 브랜드 컬러와 직관적인 알림 컬러를 포인트로 사용합니다.

| 역할 (Role) | 토큰명 (Token) | Hex 코드 (예시) | 사용처 |
| --- | --- | --- | --- |
| Primary Brand | `--color-brand-primary` | `#03C75A` | 활성 탭 배경, 주요 액션 버튼 텍스트/아이콘, 포인트 테두리 |
| Primary Tint | `--color-brand-tint` | `#E8F8F0` | 활성화된 사이드바 메뉴 배경, 서브 CTA 버튼 배경 |
| Accent / Promo | `--color-accent-banner` | `#2400FF` | 최상단 프로모션/공지 배너 배경 (고대비 시선 유도) |
| Alert / Badge | `--color-status-alert` | `#FF3B30` | 읽지 않은 알림 수, 'N'(New) 뱃지 배경 |
| Canvas Background | `--color-bg-canvas` | `#FFFFFF` | 메인 콘텐츠 영역 및 헤더 기본 배경 |
| Surface Secondary | `--color-bg-surface` | `#F7F9FA` | 우측 보조 카드 배경, 비활성 필터 칩 배경 |
| Text Primary | `--color-text-primary` | `#1E1E23` | 섹션 타이틀, 그룹명, 주요 본문 텍스트 |
| Text Secondary | `--color-text-secondary` | `#666666` | 게시글 제목, 일반 네비게이션 메뉴 |
| Text Muted | `--color-text-muted` | `#999999` | 작성자명, 타임스탬프, 메타 정보, 부가 설명 |
| Border / Divider | `--color-border-subtle` | `#EBECEF` | 카드 외곽선, 섹션 간 구분선, 검색창 테두리 |

## 2. 타이포그래피 (Typography)

한글 가독성이 뛰어난 고딕 계열 산세리프(Pretendard, Malgun Gothic, Apple SD Gothic Neo)를 기본으로 하며, 크기와 굵기(Weight)만으로 정보의 위계를 명확히 구분합니다.

- **Font Family**: `'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`
- **Hierarchy & Scale**:
  - **Page Title (H1)**: `20px` / Bold (`700`) / Line-height `1.4` — 메인 영역 최상단 타이틀 (예: "카페홈")
  - **Group / Card Title (H2)**: `16px` / Bold (`700`) / Line-height `1.4` — 개별 채널명, 우측 위젯 타이틀
  - **Feed Item Title (Body 1)**: `14px` / Regular (`400`) / Line-height `1.5` — 리스트 내 핵심 콘텐츠 제목 (말줄임표 `ellipsis` 필수 적용)
  - **Navigation & Filter (Body 2)**: `14px` / Medium (`500`) / Line-height `1.4` — 좌측 메뉴, 상단 필터 탭
  - **Metadata & Caption**: `12px` / Regular (`400`) / Line-height `1.3` — 새 글 카운트, 작성자, 작성 시간, 댓글 수
  - **Micro Badge**: `10px` / Bold (`700`) / Line-height `1.0` — 뱃지 내부 숫자 및 상태 표시 (`N`, `Beta`)

## 3. 여백 및 모서리 규칙 (Spacing & Radius)

8px 그리드 시스템을 기반으로 일관된 간격을 유지하며, 요소의 성격에 따라 모서리 둥글기(Border Radius)를 다르게 적용합니다.

### Spacing Scale
- `4px` (`--space-xs`): 아이콘과 텍스트 사이 간격, 인라인 메타데이터 간격
- `8px` (`--space-sm`): 리스트 아이템 내부 상하 여백, 인접한 뱃지 간 간격
- `12px` (`--space-md`): 섹션 내부 요소 간 간격, 카드 내부 패딩(소형)
- `16px` (`--space-lg`): 우측 사이드바 카드 내부 패딩, 피드 그룹 간 여백
- `24px` (`--space-xl`): 피드 그룹(채널)과 다음 피드 그룹 사이의 수직 분리 간격
- `32px` (`--space-2xl`): 메인 컬럼과 좌/우 사이드바 사이의 수평 거터(Gutter)

### Border Radius
- **Full Pill (`9999px`)**: 검색창, 필터 칩(Chip), 알림 뱃지, 아바타(원형)
- **Card Container (`12px`)**: 우측 위젯 카드, 프로모션 배너 카드
- **Button & Menu Item (`8px`)**: 좌측 네비게이션 활성 배경, 카드 내부 풀와이드 액션 버튼
- **Channel Thumbnail (`12px ~ 16px`)**: 리스트 좌측의 정사각형 아이콘/썸네일 (Squircle 형태)

## 4. 레이아웃 아키텍처 (Layout Rules)

정보 탐색(좌) → 콘텐츠 소비(중앙) → 개인화 및 보조 정보(우)로 이어지는 3단 비대칭 그리드(Asymmetric 3-Column Grid) 구조를 따릅니다.

- **Global Top Header (Height: `64px`)**:
  - 좌측: 브랜드 로고 + 서비스 스위처
  - 중앙: 캡슐형 통합 검색바 (드롭다운 필터 내장)
  - 우측: 유틸리티 아이콘 그룹 (프로필, 채팅, 알림, 메일, 앱 런처)
- **Full-Width Notice Strip (Height: `40px`)**:
  - 헤더 바로 아래 배치되어 시스템 공지나 주요 캠페인을 1줄 텍스트로 전달
- **Main Container (Max-Width: `1280px`, 중앙 정렬)**:
  - **Left Navigation Rail (Width: `200px`, Fixed/Sticky)**:
    - 핵심 뷰 전환 메뉴(상단)와 카테고리 탐색 메뉴(하단)를 `1px` 구분선으로 분리
  - **Center Main Feed (Fluid Width, 최소 `600px` 이상)**:
    - 상단 필터 칩 영역 + 세로 스크롤 기반의 그룹화된 리스트 피드
    - 각 그룹은 `[썸네일 + 타이틀 + 메타 카운트 + 즐겨찾기 토글]` 헤더와 `[최대 3~5개의 최신 아이템 행]`으로 구성
    - 각 아이템 행은 좌측(제목 + 댓글 수)과 우측(작성자 + 상대 시간)을 `justify-content: space-between`으로 양끝 정렬하여 스캔 효율 극대화
  - **Right Utility Sidebar (Width: `300px`)**:
    - 사용자 요약 프로필 카드, 시스템 공지사항 위젯, 배너 등 독립된 박스 모듈을 수직으로 스택(Stack) 배치

## 5. 핵심 컴포넌트 패턴 (Component Patterns)

- **Grouped Feed Row (그룹형 리스트 행)**:
  - 구분선(Divider)을 남발하지 않고 여백(`24px`)으로 그룹을 분리합니다.
  - 개별 게시글 행에는 테두리를 없애고, 호버(Hover) 시에만 미세한 배경색 변화나 텍스트 밑줄을 부여해 시각적 노이즈를 줄입니다.
- **Metadata Alignment (메타데이터 우측 정렬)**:
  - 작성자와 작성 시간(`32분 전`, `2026.11.23.`)은 항상 우측에 고정폭 또는 우측 정렬로 배치하여, 사용자가 좌측의 제목만 수직으로 빠르게 훑어볼 수 있도록 설계합니다.
