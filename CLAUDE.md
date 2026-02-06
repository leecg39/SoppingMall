# CLAUDE.md

> 이 파일은 Claude Code가 프로젝트 컨텍스트를 빠르게 파악하도록 돕습니다.

## 프로젝트 개요

- **이름**: Vibe Store
- **설명**: 바이브랩스 유튜브 채널의 라이브 코딩 콘텐츠용 디지털 상품 쇼핑몰 스캘레톤
- **기술 스택**: Next.js 15 (App Router), Supabase, Vercel, Toss Payments, TypeScript, Tailwind CSS, shadcn/ui

## 핵심 목표

1. 라이브 코딩 콘텐츠로 사용될 쇼핑몰 스캘레톤 완성
2. 비개발자가 AI(바이브코딩)로 커스터마이징 가능한 코드 품질 유지
3. 유튜브 구독자 5천 → 1만 달성 (3개월)

## 빠른 시작

```bash
# 설치
npm install

# 개발 서버
npm run dev

# 테스트
npm run test

# 린트
npm run lint

# 타입 체크
npm run type-check
```

## 프로젝트 구조

```
vibeShop/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (shop)/             # 고객 페이지 (라우트 그룹)
│   │   ├── admin/              # 관리자 페이지
│   │   └── api/                # API Routes
│   ├── components/
│   │   ├── ui/                 # shadcn/ui 컴포넌트
│   │   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── products/           # 상품 관련
│   │   └── cart/               # 장바구니 관련
│   ├── lib/
│   │   ├── supabase/           # Supabase 클라이언트
│   │   └── toss/               # 토스페이먼츠 유틸
│   ├── stores/                 # Zustand 스토어
│   ├── types/                  # TypeScript 타입
│   └── hooks/                  # 커스텀 훅
├── supabase/
│   └── migrations/             # DB 마이그레이션
├── tests/                      # 테스트 파일
└── docs/
    └── planning/               # 기획 문서
```

## 기획 문서 참조

| 문서 | 경로 | 내용 |
|------|------|------|
| PRD | `docs/planning/01-prd.md` | 제품 요구사항, 페르소나, 성공 지표 |
| TRD | `docs/planning/02-trd.md` | 기술 스택, 아키텍처, API 설계 |
| User Flow | `docs/planning/03-user-flow.md` | 사용자 여정, 화면 목록 |
| DB Design | `docs/planning/04-database-design.md` | ERD, RLS 정책, 마이그레이션 |
| Design System | `docs/planning/05-design-system.md` | 컬러, 타이포, 컴포넌트 |
| **TASKS** | `docs/planning/06-tasks.md` | 태스크 목록, 의존성, 에이전트 매핑 |
| Coding Convention | `docs/planning/07-coding-convention.md` | 코딩 규칙, AI 협업 가이드 |

## 컨벤션

- **커밋 메시지**: Conventional Commits (한글 가능)
  - `feat(products): 상품 상세 페이지 구현`
  - `fix(cart): 수량 변경 버그 수정`
- **브랜치 전략**: `feat/*`, `fix/*`, `phase/*`
- **코드 스타일**: ESLint + Prettier (설정 후)
- **파일 네이밍**: kebab-case (`product-card.tsx`)
- **컴포넌트**: PascalCase (`ProductCard`)

## 핵심 규칙

1. **서버 컴포넌트 우선**: 클라이언트 컴포넌트는 꼭 필요할 때만 `'use client'`
2. **RLS 우선 보안**: 모든 데이터 접근은 Supabase RLS로 보호
3. **TDD 워크플로우**: Phase 1+ 태스크는 테스트 먼저 작성
4. **라이브 코딩 친화적**: 주석 활용, 단계별 구현

## 환경 변수

```bash
# .env.local (필수)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
TOSS_CLIENT_KEY=
TOSS_SECRET_KEY=
NEXT_PUBLIC_APP_URL=

# NextAuth.js (Auth.js v5)
AUTH_SECRET=  # openssl rand -base64 32 로 생성
AUTH_URL=http://localhost:3000
```

---

## Auto-Orchestrate 진행 상황

> 이 섹션은 `/auto-orchestrate` 실행 시 자동으로 업데이트됩니다.

### 완료된 Phase

| Phase | 태스크 | 완료일 | 주요 내용 |
|-------|--------|--------|----------|
| Phase 0 | P0-T0.1 | 2026-01-26 | NextAuth.js 설치 및 기본 설정 |

### 현재 Phase

- 아직 시작되지 않음

### 재개 명령어

```bash
/auto-orchestrate --resume
```

---

## Lessons Learned

> 에이전트가 난관을 극복하며 발견한 교훈을 기록합니다.

<!-- 예시:
- RLS 정책 테스트 시 auth.uid()가 NULL인 경우를 반드시 고려해야 함
- Toss Payments 웹훅은 반드시 POST로만 수신 가능
-->
