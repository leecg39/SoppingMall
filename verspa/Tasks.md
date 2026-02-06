# VERSPA International Website - Development Tasks

**Last Updated**: 2025-01-08  
**Project**: VERSPA International Website (B2B Premium Massage Shampoo Chairs)

---

## 📁 Reference Documents
- **PRD**: [docs/PRD.md](docs/PRD.md) - 제품 요구사항, 사용자 스토리, 성공 기준
- **TRD**: [docs/TRD.md](docs/TRD.md) - 기술 스택, 아키텍처, 비기능 요구사항
- **User Flow**: [docs/User Flow.md](docs/User%20Flow.md) - 사용자 여정 다이어그램
- **Design System**: [docs/Design System.md](docs/Design%20System.md) - 컬러, 타이포그래피, 컴포넌트
- **Database Design**: [docs/Databse Design.md](docs/Databse%20Design.md) - 데이터 스키마 및 JSON 구조

---

## 🎨 Reference Designs (Google Stitch Prototypes)
- **Homepage**: [Design/verspa_homepage/code.html](Design/verspa_homepage/code.html)
- **Product Detail**: [Design/product_detail_page_-_verspa_basic/code.html](Design/product_detail_page_-_verspa_basic/code.html)
- **Installation Gallery**: [Design/installation_gallery_page/code.html](Design/installation_gallery_page/code.html)
- **Certifications**: [Design/certifications_&_quality_page/code.html](Design/certifications_&_quality_page/code.html)
- **Contact Us**: [Design/contact_us_-_request_quote/code.html](Design/contact_us_-_request_quote/code.html)

---







## 🧱 Phase 2: Shared Components

### Task 2.1: Navigation (Header) 컴포넌트 구현
**우선순위**: 🔴 High  
**참고 디자인**: [Design/verspa_homepage/code.html](Design/verspa_homepage/code.html) - 라인 41-63

**설명**:
- Sticky 네비게이션 헤더를 구현한다
- VERSPA 로고 (SVG star shape)와 워드마크를 포함한다
- 데스크탑 메뉴: Products, Features, Gallery, About 링크
- "Request Quote" CTA 버튼을 primary 스타일로 표시한다
- 모바일에서는 햄버거 메뉴 아이콘을 표시한다
- 스크롤 시 backdrop-blur 효과를 적용한다

**완료 기준**:
- 모든 페이지에서 동일한 헤더가 표시된다
- 반응형으로 모바일/데스크탑 레이아웃이 전환된다

---

### Task 2.2: Footer 컴포넌트 구현
**우선순위**: 🟡 Medium  
**참고 디자인**: [Design/verspa_homepage/code.html](Design/verspa_homepage/code.html) - 라인 344-398

**설명**:
- 4컬럼 그리드 레이아웃의 푸터를 구현한다
  - Column 1: 로고, 브랜드 설명, 소셜 미디어 링크 (IG, FB, LI)
  - Column 2: Products 링크 (V-Series, S-Series, X-Series, Accessories)
  - Column 3: Company 링크 (About Us, Gallery, Distributors, Contact)
  - Column 4: 저작권, Privacy Policy, Terms of Service 링크
- 다크 테마 배경 (#0c0a08)을 적용한다

**완료 기준**:
- 모든 페이지 하단에 일관된 푸터가 표시된다
- 링크들이 hover 시 primary 컬러로 전환된다

---

### Task 2.3: ProductCard 컴포넌트 구현
**우선순위**: 🔴 High  
**참고 문서**: [PRD.md - FEAT-1](docs/PRD.md#epic-1-product-discovery-mvp-priority-🥇)  
**참고 디자인**: [Design/verspa_homepage/code.html](Design/verspa_homepage/code.html) - 라인 118-191

**설명**:
- 제품 카드 컴포넌트를 구현한다
- Props로 product 객체를 받아 렌더링한다
- 구성 요소:
  - 4:3 비율의 히어로 이미지 (hover 시 scale 효과)
  - Badge 라벨 (Flagship, New Arrival 등)
  - 제품명, 가격
  - 짧은 설명 (2줄 제한)
  - 주요 기능 아이콘 태그
  - "View Details" 버튼
- 카드 hover 시 shadow 효과를 증가시킨다

**완료 기준**:
- products.json의 데이터를 props로 받아 카드가 렌더링된다
- 클릭 시 상세 페이지로 이동한다

---

### Task 2.4: ImageGallery (Lightbox) 컴포넌트 구현
**우선순위**: 🟡 Medium  
**참고 문서**: [PRD.md - FEAT-3](docs/PRD.md#feat-3-installation-gallery)  
**참고 디자인**: [Design/installation_gallery_page/code.html](Design/installation_gallery_page/code.html) - 라인 129-250

**설명**:
- 그리드 형태의 갤러리 컴포넌트를 구현한다
- 이미지 클릭 시 Lightbox 모달을 표시한다
- 각 이미지에 hover 시 오버레이를 표시하고 위치/이름 정보를 보여준다
- 이미지 lazy loading을 적용한다
- 모바일에서는 1열, 태블릿은 2열, 데스크탑은 3열 그리드를 사용한다

**완료 기준**:
- 이미지 클릭 시 전체 화면 Lightbox가 열린다
- 좌우 화살표로 이미지 탐색이 가능하다
- ESC 키 또는 배경 클릭으로 닫힌다

---

### Task 2.5: ContactForm 컴포넌트 구현
**우선순위**: 🔴 High  
**참고 문서**: [PRD.md - FEAT-4](docs/PRD.md#feat-4-contactinquiry-form)  
**참고 디자인**: [Design/contact_us_-_request_quote/code.html](Design/contact_us_-_request_quote/code.html) - 라인 147-218

**설명**:
- 견적 요청 폼을 구현한다
- 필드 구성:
  - Full Name (required)
  - Company/Salon Name
  - Business Email (required, 이메일 형식 검증)
  - Phone Number
  - Country/Region (드롭다운 선택)
  - Product Interest (드롭다운 선택)
  - Message/Specific Requirements (textarea)
- Submit 버튼은 필수 필드가 채워질 때까지 disabled 상태
- 성공 메시지: "Thank you! We'll contact you within 24 hours."
- 에러 처리: 전송 실패 시 대체 이메일 주소 안내

**완료 기준**:
- 폼 유효성 검사가 클라이언트 측에서 동작한다
- 성공/실패 상태에 따른 UI 피드백이 표시된다

---

### Task 2.6: DownloadButton 컴포넌트 구현
**우선순위**: 🟡 Medium  
**참고 문서**: [PRD.md - FEAT-2](docs/PRD.md#feat-2-certification-downloads)  
**참고 디자인**: [Design/certifications_&_quality_page/code.html](Design/certifications_&_quality_page/code.html) - 라인 136-139

**설명**:
- PDF 다운로드 버튼 컴포넌트를 구현한다
- Props: filePath, fileName, fileSize (optional)
- 아이콘과 파일명, 파일 크기를 표시한다
- 클릭 시 PDF 파일을 새 탭에서 열거나 다운로드한다
- Analytics 이벤트를 위한 onClick 콜백을 지원한다

**완료 기준**:
- 버튼 클릭 시 PDF가 다운로드되거나 새 탭에서 열린다
- 파일 크기가 표시된다

---

## 📄 Phase 3: Pages

### Task 3.1: Homepage 구현
**우선순위**: 🔴 High  
**참고 문서**: [PRD.md - Information Architecture](docs/PRD.md#📊-information-architecture)  
**참고 디자인**: [Design/verspa_homepage/code.html](Design/verspa_homepage/code.html)

**설명**:
- 다음 섹션들을 순서대로 구현한다:

1. **Hero Section** (라인 64-86)
   - 배경 이미지와 그라데이션 오버레이
   - 태그라인: "The Future of Salon Luxury"
   - 메인 헤드라인: "Revolutionizing Salon Comfort"
   - 서브카피와 CTA 버튼 2개

2. **Trusted By Section** (라인 87-99)
   - 파트너 로고 가로 배열 (VOGUE, ELLE, Harper's BAZAAR, allure)

3. **Product Lineup Carousel** (라인 100-194)
   - 섹션 제목과 설명
   - 좌우 스크롤 가능한 ProductCard 캐러셀
   - 화살표 버튼으로 탐색

4. **Features Section** (라인 195-258)
   - 2컬럼 레이아웃: 텍스트 + 이미지 그리드
   - 3개 특징 아이콘 리스트 (Ergonomic, Whisper-Quiet, Premium Materials)
   - 통계 카드 (5+ Years Warranty)

5. **Installation Gallery Preview** (라인 259-301)
   - 제목: "Elevating Spaces Worldwide"
   - 3개 대표 설치 사진
   - "View Full Gallery" 버튼

6. **Certification Section** (라인 302-324)
   - 인증 배지 4개 (ISO 9001, Eco Cert, UL Listed)
   - 간략한 설명

7. **CTA Section** (라인 325-342)
   - 제목: "Ready to Upgrade Your Salon?"
   - Request Quote, Download Catalog 버튼

**완료 기준**:
- 모든 섹션이 반응형으로 구현된다
- 스크롤 시 부드러운 전환 효과가 적용된다

---

### Task 3.2: Product Detail Page 구현
**우선순위**: 🔴 High  
**참고 문서**: [PRD.md - FEAT-1.1](docs/PRD.md#feat-11-view-product-detail-page)  
**참고 디자인**: [Design/product_detail_page_-_verspa_basic/code.html](Design/product_detail_page_-_verspa_basic/code.html)

**설명**:
- 동적 라우트 `/products/[slug]`를 구현한다
- products.json에서 해당 제품 데이터를 로드한다
- 페이지 구성:

1. **Hero Section** (라인 60-104)
   - 좌측: 제품 히어로 이미지 (4:3 비율)
   - 우측: Best Seller 배지, 제품명, 설명, 가격, CTA 버튼들

2. **Features Grid** (라인 105-150)
   - 4컬럼 특징 카드 (Ergonomic, Whisper Quiet, Premium Leather, Easy Maintenance)
   - 각 카드에 아이콘, 제목, 설명

3. **Specifications Table** (라인 151-223)
   - 좌측: 다운로드 섹션 (Product Brochure, Installation Guide)
   - 우측: 스펙 테이블 (Dimensions, Weight, Voltage, Warranty, Colors 등)

4. **Visual Gallery** (라인 224-247)
   - Bento 그리드 레이아웃의 상세 이미지 갤러리

5. **CTA Section** (라인 248-266)
   - 제목: "Elevate Your Salon Today"
   - Request Quote, Contact Sales 버튼

**완료 기준**:
- /products/verspa-basic 등 각 제품 URL이 동작한다
- Static Generation으로 빌드 시 모든 제품 페이지가 생성된다

---

### Task 3.3: Installation Gallery Page 구현
**우선순위**: 🟡 Medium  
**참고 문서**: [PRD.md - FEAT-3](docs/PRD.md#feat-3-installation-gallery)  
**참고 디자인**: [Design/installation_gallery_page/code.html](Design/installation_gallery_page/code.html)

**설명**:
- /gallery 페이지를 구현한다
- 페이지 구성:

1. **Page Heading** (라인 83-94)
   - 제목: "Global Installations"
   - 서브카피

2. **Filter Section** (라인 95-125)
   - Sticky 필터 바
   - 제품 모델별 필터 버튼 (All Models, V-Series, Relax Pro)
   - 지역별 필터 드롭다운
   - 결과 수 표시 ("Showing 42 installations")

3. **Gallery Grid** (라인 126-252)
   - 3컬럼 반응형 그리드
   - 각 이미지에 hover 오버레이 (위치, 살롱명, 설명)
   - Fullscreen 버튼

4. **Pagination** (라인 253-268)
   - 페이지 번호 네비게이션

5. **Bottom CTA** (라인 269-285)
   - "Ready to transform your salon?"
   - Download Catalog, Get a Quote 버튼

**완료 기준**:
- 필터 버튼 클릭 시 갤러리가 필터링된다
- Lightbox가 정상 동작한다

---

### Task 3.4: Certifications & Quality Page 구현
**우선순위**: 🟡 Medium  
**참고 문서**: [PRD.md - FEAT-2](docs/PRD.md#feat-2-certification-downloads)  
**참고 디자인**: [Design/certifications_&_quality_page/code.html](Design/certifications_&_quality_page/code.html)

**설명**:
- /certifications 페이지를 구현한다
- 페이지 구성:

1. **Hero Section** (라인 62-103)
   - 제목: "Global Quality Standards"
   - 서브카피, View Documentation / Contact Support 버튼
   - 히어로 이미지

2. **Certifications Grid** (라인 104-227)
   - 2컬럼 그리드로 인증서 카드 표시
   - 각 카드: 로고, 인증명, 설명, 갱신일, PDF 다운로드 버튼
   - KC, CE, FDA, ISO 9001

3. **Intellectual Property Section** (라인 229-257)
   - 특허 및 디자인권 수 표시 (12 Patents, 08 Design Rights)
   - Patent List 다운로드 버튼

4. **Technical Documentation Table** (라인 258-318)
   - 문서 목록 테이블 (Document Name, Category, Date, Action)
   - 항목: Spec Sheet, Safety Report, User Manual

**완료 기준**:
- 모든 인증서 PDF가 다운로드 가능하다
- certifications.json 데이터와 연동된다

---

### Task 3.5: Contact Us Page 구현
**우선순위**: 🔴 High  
**참고 문서**: [PRD.md - FEAT-4](docs/PRD.md#feat-4-contactinquiry-form)  
**참고 디자인**: [Design/contact_us_-_request_quote/code.html](Design/contact_us_-_request_quote/code.html)

**설명**:
- /contact 페이지를 구현한다
- 2컬럼 레이아웃:

1. **Left Column** (라인 96-138)
   - 배지: "Official Quote Request"
   - 제목: "Elevate Your Salon Experience"
   - 설명 텍스트
   - 제품 이미지 (X1 Series)
   - 연락처 정보 (Email, Phone)

2. **Right Column** (라인 140-219)
   - ContactForm 컴포넌트 사용
   - 폼 제출 후 성공 메시지 표시

**완료 기준**:
- 폼 제출이 정상 작동한다
- 입력 필드 유효성 검사가 동작한다

---

## ⚙️ Phase 4: API & Integrations

### Task 4.1: Contact Form API Route 구현
**우선순위**: 🔴 High  
**참고 문서**: [TRD.md - Email Service](docs/TRD.md#email-service-resend-api-for-contact-form)

**설명**:
- `/api/contact` API 라우트를 구현한다
- Resend API를 사용하여 이메일을 전송한다
- 요청 데이터:
  ```typescript
  {
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    interest: string;
    message: string;
  }
  ```
- 수신 이메일: info@combhair.kr
- 에러 발생 시 적절한 오류 메시지를 반환한다
- Rate limiting을 구현하여 스팸을 방지한다

**완료 기준**:
- 폼 제출 시 이메일이 전송된다
- 환경 변수로 API 키를 관리한다

---

### Task 4.2: PDF 다운로드 트래킹 구현
**우선순위**: 🟢 Low  
**참고 문서**: [TRD.md - Monitoring & Analytics](docs/TRD.md#📊-monitoring--analytics)

**설명**:
- PDF 다운로드 버튼 클릭 시 Analytics 이벤트를 전송한다
- Vercel Analytics 또는 Google Analytics 4 연동
- 트래킹 항목: 파일명, 페이지, 타임스탬프

**완료 기준**:
- 다운로드 이벤트가 Analytics 대시보드에 기록된다

---

## 🎯 Phase 5: SEO & Performance

### Task 5.1: Meta Tags & SEO 설정
**우선순위**: 🔴 High  
**참고 문서**: [TRD.md - SEO Requirements](docs/TRD.md#seo-requirements)

**설명**:
- 각 페이지에 적절한 meta tags를 설정한다:
  - title, description, og:image, og:title, og:description
- JSON-LD 구조화 데이터를 추가한다 (Organization, Product)
- robots.txt와 sitemap.xml을 자동 생성한다
- 각 페이지에 canonical URL을 설정한다

**완료 기준**:
- Lighthouse SEO 점수 90+ 달성
- Open Graph 이미지가 SNS 공유 시 표시된다

---

### Task 5.2: 이미지 최적화
**우선순위**: 🟡 Medium  
**참고 문서**: [TRD.md - Performance](docs/TRD.md#performance)

**설명**:
- 모든 이미지에 Next.js `<Image>` 컴포넌트를 사용한다
- srcset과 sizes 속성을 적절히 설정한다
- WebP 형식으로 자동 최적화되도록 한다
- 갤러리 이미지에 lazy loading을 적용한다
- 히어로 이미지에 priority 속성을 설정한다

**완료 기준**:
- LCP (Largest Contentful Paint) < 2.5s 달성
- 이미지가 WebP 형식으로 제공된다

---

### Task 5.3: 접근성 (Accessibility) 구현
**우선순위**: 🟡 Medium  
**참고 문서**: [TRD.md - Accessibility](docs/TRD.md#accessibility-wcag-21-level-aa)

**설명**:
- 모든 이미지에 적절한 alt 텍스트를 추가한다
- 시맨틱 HTML5 태그를 사용한다 (<nav>, <main>, <article>)
- 키보드 네비게이션이 가능하도록 focus 상태를 구현한다
- 색상 대비 비율 4.5:1 이상을 유지한다
- Skip to main content 링크를 추가한다
- ARIA 레이블을 적절히 사용한다

**완료 기준**:
- Lighthouse Accessibility 점수 90+ 달성
- 키보드만으로 모든 기능 사용 가능

---

## 🚀 Phase 6: Deployment & Testing

### Task 6.1: Vercel 배포 설정
**우선순위**: 🔴 High  
**참고 문서**: [TRD.md - Deployment Strategy](docs/TRD.md#🚀-deployment-strategy)

**설명**:
- GitHub 저장소를 Vercel에 연결한다
- 환경 변수를 설정한다 (RESEND_API_KEY)
- 커스텀 도메인을 설정한다 (optional)
- Preview 배포가 PR마다 생성되도록 한다

**완료 기준**:
- main 브랜치 푸시 시 자동 배포된다
- Preview URL이 PR에 자동으로 표시된다

---

### Task 6.2: 크로스 브라우저 & 모바일 테스트
**우선순위**: 🟡 Medium  
**참고 문서**: [TRD.md - Browser/Device Support](docs/TRD.md#browserdevice-support)

**설명**:
- 다음 환경에서 테스트를 수행한다:
  - Chrome (최신 2버전)
  - Safari iOS (최신 2버전)
  - Samsung Internet (최신)
- 반응형 테스트: iPhone SE, iPad, Desktop (1280px+)
- 모든 폼과 버튼이 정상 동작하는지 확인한다
- PDF 다운로드가 모든 환경에서 작동하는지 확인한다

**완료 기준**:
- 주요 브라우저에서 레이아웃이 깨지지 않는다
- 모든 인터랙티브 요소가 정상 작동한다

---

### Task 6.3: Performance 최적화 검증
**우선순위**: 🟡 Medium  
**참고 문서**: [TRD.md - Performance](docs/TRD.md#performance)

**설명**:
- Lighthouse로 성능을 측정하고 개선한다
- 목표 지표:
  - FCP < 1.5s
  - LCP < 2.5s
  - CLS < 0.1
  - Total Page Size < 2MB
- 필요시 이미지 압축, 코드 스플리팅을 적용한다

**완료 기준**:
- Lighthouse Performance 점수 90+ 달성

---

## 📝 Notes

### 우선순위 레벨
- 🔴 **High**: 필수 기능, MVP에 반드시 포함
- 🟡 **Medium**: 중요하지만 MVP 이후 추가 가능
- 🟢 **Low**: Nice-to-have, 시간 여유 시 구현

### 개발 순서 권장
1. Phase 1 (Setup) → Phase 2 (Components) → Phase 3 (Pages)
2. Phase 3 내에서는 Homepage → Product Detail → Contact → 나머지 순서 권장
3. Phase 4, 5는 Phase 3과 병행 가능
4. Phase 6은 마지막에 수행

### 성공 기준
- [PRD.md - Launch Readiness Checklist](docs/PRD.md#launch-readiness-checklist) 참조
