# 📚 ROSE 문고 - 프로젝트 소개

## 프로젝트 개요

ROSE 문고는 책 목록 관리 및 상세 정보 조회, 추가, 수정, 삭제 기능을 제공하는 웹 애플리케이션입니다.
Next.js와 Express.js를 기반으로 프론트엔드와 백엔드가 통합된 프로젝트입니다.

## 💻 기술 스택

### 프론트엔드
- 프레임워크: Next.js + React
- 언어: TypeScript
- 스타일링: Styled-components, Material-UI
- 상태 관리: React useState 및 useEffect
- API 호출: Axios
- 반응형 디자인: Styled-components를 활용한 CSS 미디어쿼리

### 백엔드
- 프레임워크: Express.js
- 언어: TypeScript
- 데이터 관리: JSON 파일 (books.json)
- 파일 업로드: Multer (이미지 업로드 및 관리)
- API 설계: RESTful API
- 오류 처리: 커스텀 에러 핸들러

## 🗂️ 폴더 구조
```
BOOKSTORE-APP/
├── backend/                 # 백엔드 프로젝트
│   ├── src/
│   │   ├── app.ts           # Express 서버 설정
│   │   ├── server.ts        # 서버 진입점
│   │   ├── controllers/     # 라우트 핸들러 (로직 분리)
│   │   ├── routes/          # API 라우트 정의
│   │   ├── utils/           # 유틸리티 함수 (에러 핸들러, 파일 업로드)
│   │   ├── public/          # 이미지 업로드 폴더
│   │   ├── data/            # 책 데이터 (books.json)
│   │   └── __tests__/       # 테스트 코드 폴더
│   ├── package.json         # 백엔드 종속성 설정
│   └── tsconfig.json        # TypeScript 설정
│
├── frontend/                # 프론트엔드 프로젝트
│   ├── app/                 # Next.js 앱 디렉토리
│   │   ├── layout.tsx       # 전체 레이아웃 설정
│   │   ├── page.tsx         # 메인 페이지 (책 목록 및 검색)
│   │   ├── books/           # 책 상세 정보 페이지
│   │   │   ├── [id]/page.tsx # 책 상세 페이지
│   │   │   └── add.tsx      # 책 추가 페이지
│   ├── components/          # UI 컴포넌트 (Header, BookCard, Pagination)
│   ├── utils/               # API 통신 설정 (Axios)
│   ├── public/              # 정적 파일 (아이콘 등)
│   ├── styles/              # 전역 스타일 설정
│   ├── package.json         # 프론트엔드 종속성 설정
│   └── tsconfig.json        # TypeScript 설정
│
└── README.md                # 프로젝트 설명 및 실행 방법
```
## 🚀 주요 기능

### 1. 책 목록 조회 (Pagination + 검색)
- 기능: 페이지네이션을 통해 10개씩 책을 표시합니다.
- 검색: 제목 또는 저자에 따라 책을 검색할 수 있습니다.
- API: GET /api/books?page={page}&search={query}&searchField={field}

### 2. 책 상세 정보 조회
- 기능: 클릭한 책의 상세 정보를 표시합니다.
- 페이지 경로: /books/[id]
- API: GET /api/books/:id

### 3. 책 추가
- 기능: 책 정보를 입력하고 이미지를 업로드해 추가합니다.
- 페이지 경로: /books/add
- API: POST /api/books

### 4. 책 수정
- 기능: 책 상세 페이지에서 “수정하기”를 눌러 정보를 수정할 수 있습니다.
- API: PUT /api/books/:id

### 5. 책 삭제
- 기능: 책 상세 페이지에서 “삭제하기”를 눌러 책과 이미지를 삭제합니다.
- API: DELETE /api/books/:id

## ⚙️ 실행 방법

### 1. 백엔드 실행
서버는 http://localhost:5001에서 실행됩니다.
```
cd backend
npm install
npm run dev
```

### 2. 프론트엔드 실행
애플리케이션은 http://localhost:3000에서 실행됩니다.
```
cd frontend
npm install
npm run dev
```

## 🧪 테스트
단위 테스트: Jest를 사용하여 API 엔드포인트와 기능을 테스트합니다.
```
npm run test
```
## 📌 프로젝트 시연화면
- 메인 화면 (책 목록): 책 목록을 페이지네이션과 검색 기능을 통해 탐색할 수 있습니다.
- 상세 페이지 : 책의 상세 정보를 확인하고 수정, 삭제가 가능합니다.
- 책 수정/삭제 페이지 : 책의 정보를 수정하거나 삭제 할 수 있습니다.

https://github.com/user-attachments/assets/8fc3285d-cd29-4d15-b75b-3d7938e08543

## 🎨 디자인
- 반응형: 모바일 및 데스크톱에서 최적화된 화면을 제공합니다.
- UI: Material-UI와 Styled-components를 조합하여 깔끔하고 직관적인 UI를 구현했습니다.

## 🛠️ 추가 개선 사항
1. 배포: 백엔드 서버와 정적 파일 관리를 위한 클라우드 스토리지 도입 (S3, Firebase Storage 등)
2. 에러 처리: 사용자 친화적인 에러 메시지 제공
3. 이미지 최적화: 배포 시 이미지 CDN 적용
