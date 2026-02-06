# **3. User Flow (사용자 흐름도)**
`````markdown
# User Flow Diagram
## VERSPA International Website

**Document Version**: 1.0  
**Last Updated**: 2025-01-08

---

## 🗺️ Primary User Journeys

### Journey 1: Product Research → Quote Request
````mermaid
graph TD
    A[Buyer receives VERSPA URL<br/>from sales team / trade show] --> B{Access Device?}
    B -->|Mobile 60%| C[Land on Homepage<br/>Mobile View]
    B -->|Desktop 40%| D[Land on Homepage<br/>Desktop View]
    
    C --> E[Scroll to Product Lineup Section]
    D --> E
    
    E --> F[Browse 4 Product Cards<br/>FEAT-1]
    F --> G{Product of Interest?}
    
    G -->|Yes| H[Click 'Learn More' on Product Card]
    G -->|No - Compare More| F
    
    H --> I[View Product Detail Page<br/>FEAT-1.1]
    I --> J[Review Specifications Table]
    J --> K[View Image Gallery]
    K --> L{Need More Info?}
    
    L -->|Download Catalog| M[Click 'Download PDF' Button<br/>FEAT-2]
    L -->|See Real Installations| N[Navigate to Gallery<br/>FEAT-3]
    L -->|Ready to Inquire| O[Click 'Request Quote' CTA<br/>FEAT-4]
    
    M --> P[PDF Opens in New Tab]
    P --> Q{Satisfied?}
    Q -->|Yes| O
    Q -->|Need More Details| R[Email Sales Team Directly]
    
    N --> S[Browse Installation Photos<br/>Filter by Product Model]
    S --> T{Convinced?}
    T -->|Yes| O
    T -->|Not Sure| U[Download Certification PDFs<br/>FEAT-2]
    
    O --> V[Fill Contact Form<br/>Name, Company, Email, Message]
    V --> W{Form Valid?}
    W -->|No - Missing Fields| X[Show Validation Errors]
    X --> V
    W -->|Yes| Y[Submit Form]
    Y --> Z[Show Success Message<br/>'We'll contact you in 24h']
    Z --> AA[Email Sent to info@combhair.kr]
    
    U --> O
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style O fill:#9f9,stroke:#333,stroke-width:2px
    style Z fill:#9f9,stroke:#333,stroke-width:2px
    style AA fill:#9f9,stroke:#333,stroke-width:2px
````

---

### Journey 2: Quick Certification Verification
````mermaid
graph TD
    A[Buyer needs proof of certifications<br/>for compliance check] --> B[Navigate to Homepage]
    B --> C[Scroll to 'Certifications & Quality' Section]
    C --> D[View Certification Badges<br/>KC, CE, FDA, ISO 9001]
    D --> E{Which Certificate?}
    
    E -->|KC| F[Click KC Badge]
    E -->|CE| G[Click CE Badge]
    E -->|FDA| H[Click FDA Badge]
    E -->|Patents| I[Click '11 Patents' Link]
    
    F --> J[Download KC Certificate PDF<br/>FEAT-2]
    G --> J
    H --> J
    I --> J
    
    J --> K[PDF Opens/Downloads]
    K --> L{Need More Certificates?}
    L -->|Yes| E
    L -->|No| M[Share PDF with Compliance Team]
    M --> N[Proceed with Purchase Evaluation]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style N fill:#9f9,stroke:#333,stroke-width:2px
````

---

### Journey 3: Installation Gallery Exploration
````mermaid
graph TD
    A[Salon Owner wants to see<br/>VERSPA in real salons] --> B[Navigate to Homepage]
    B --> C[Click 'Installation Gallery' in Menu<br/>or Scroll to Gallery Section]
    C --> D[View Gallery Grid<br/>12+ Photos]
    D --> E{Filter Options?}
    
    E -->|By Product Model| F[Select 'VERSPA Zenith' Filter]
    E -->|By Region| G[Select 'Europe' Filter]
    E -->|View All| H[Browse All Photos]
    
    F --> I[Gallery Updates with Filtered Results]
    G --> I
    H --> I
    
    I --> J[Click on Photo of Interest]
    J --> K[Lightbox Opens<br/>Full-Screen View]
    K --> L[Read Caption<br/>Salon Name, Location, Product Model]
    L --> M{See More Photos?}
    
    M -->|Yes| N[Click Next Arrow in Lightbox]
    N --> K
    M -->|No| O[Close Lightbox]
    
    O --> P{Convinced to Purchase?}
    P -->|Yes| Q[Click 'Request Quote' CTA]
    P -->|Want Product Details| R[Navigate to Product Page]
    P -->|Not Ready| S[Exit Website<br/>Bookmark for Later]
    
    Q --> T[Fill Contact Form<br/>FEAT-4]
    R --> U[View Product Specifications]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style Q fill:#9f9,stroke:#333,stroke-width:2px
    style T fill:#9f9,stroke:#333,stroke-width:2px
````

---

## 🚫 Error & Edge Case Flows

### Error Flow: Form Submission Failure
````mermaid
graph TD
    A[User Fills Contact Form] --> B[Clicks Submit Button]
    B --> C{Form Validation}
    C -->|Invalid Email Format| D[Show Error: 'Please enter valid email']
    C -->|Missing Required Fields| E[Show Error: 'Please fill all fields']
    C -->|Valid| F[Send to Server]
    
    F --> G{Server Response}
    G -->|Success| H[Show Success Message]
    G -->|Network Error| I[Show Error: 'Connection failed, try again']
    G -->|Server Error| J[Show Error: 'Unable to send. Email us at info@combhair.kr']
    
    D --> A
    E --> A
    I --> K[User Clicks 'Retry']
    K --> B
    J --> L[User Copies Email Address<br/>Contacts Directly]
    
    style H fill:#9f9,stroke:#333,stroke-width:2px
    style L fill:#ff9,stroke:#333,stroke-width:2px
````

---

### Edge Case: Large PDF Download on Slow Connection
````mermaid
graph TD
    A[User on 3G Connection<br/>Clicks Download PDF] --> B{File Size Check}
    B -->|Small PDF <2MB| C[Download Starts Immediately]
    B -->|Large PDF >5MB| D[Show Warning: 'Large file, may take time']
    
    D --> E[User Confirms Download]
    E --> F[Download Progress Indicator]
    F --> G{Download Complete?}
    
    G -->|Success| H[PDF Opens/Saves]
    G -->|Timeout| I[Show Error: 'Download failed']
    
    I --> J[Offer Alternative: 'Email PDF to me']
    J --> K[User Enters Email]
    K --> L[PDF Sent via Email]
    
    style H fill:#9f9,stroke:#333,stroke-width:2px
    style L fill:#9f9,stroke:#333,stroke-width:2px
````

---

## 📊 Conversion Funnel
````mermaid
graph TD
    A[Website Visitors<br/>100%] --> B[View Homepage<br/>95%]
    B --> C[Click Product Card<br/>70%]
    C --> D[View Product Detail<br/>65%]
    D --> E[Download PDF or View Gallery<br/>40%]
    E --> F[Submit Contact Form<br/>10%]
    F --> G[Email Delivered to Sales<br/>100%]
    G --> H[Sales Follow-up<br/>Within 24h]
    
    style A fill:#cce5ff
    style F fill:#9f9,stroke:#333,stroke-width:3px
    style G fill:#9f9,stroke:#333,stroke-width:3px
````

**Target Conversion Rate**: 10% (Homepage visitors → Form submission)

---

## 🎯 Success Path Metrics

| Touchpoint | Success Indicator | Failure Signal |
|------------|------------------|----------------|
| Homepage Load | Time to Interactive < 3s | Bounce rate >60% |
| Product Card Click | >70% click-through | <50% engagement |
| Product Detail View | Avg. time >2 minutes | <1 minute (not reading) |
| PDF Download | >40% download rate | <20% (not interested) |
| Contact Form | >10% submission rate | <5% (conversion too low) |

---

**Document End**

---