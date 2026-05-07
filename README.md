# 토스 스타일 To-do 리스트 풀스택 프로젝트

완전한 풀스택 To-do 리스트 애플리케이션입니다. Node.js + Express 백엔드와 React + Tailwind 프론트엔드로 구성되어 있습니다.

## 📁 프로젝트 구조

```
CHECKLIST/
├── back/                    # 백엔드 (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── index.ts        # 메인 서버 파일
│   │   ├── store.ts        # 메모리 데이터 저장소
│   │   └── types.ts        # TypeScript 타입 정의
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md           # 백엔드 가이드
│
└── front/                   # 프론트엔드 (React + Tailwind + Vite)
    ├── src/
    │   ├── components/     # React 컴포넌트
    │   ├── api/            # API 호출 유틸리티
    │   ├── types/          # TypeScript 타입
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── tailwind.config.ts
    ├── vite.config.ts
    ├── package.json
    └── README.md           # 프론트엔드 가이드
```

## 🚀 빠른 시작

### 1️⃣ 백엔드 설정
```bash
cd CHECKLIST/back
npm install
npm run dev          # 개발 서버 실행
```

서버는 `http://localhost:5000`에서 실행됩니다.

### 2️⃣ 프론트엔드 설정 (새 터미널에서)
```bash
cd CHECKLIST/front
npm install
npm run dev          # 개발 서버 실행
```

앱은 `http://localhost:3000`에서 자동으로 열립니다.

## 🎨 디자인 특징

### 토스(Toss) 스타일
- **배경색**: #F2F4F6 (매우 연한 회색)
- **주요 색상**: #3182F6 (선명한 파란색)
- **카드 배경**: #FFFFFF (순수 흰색)
- **폰트**: Pretendard (깔끔한 한글 폰트)

### UI 요소
- 부드러운 모서리 (rounded-toss: 12px)
- Hover 효과로 인터랙티브성 강화
- Framer Motion으로 부드러운 애니메이션

## ✨ 주요 기능

### 📝 To-do 관리
| 기능 | 설명 |
|------|------|
| **추가** | 입력창에 텍스트를 입력하고 엔터 또는 추가 버튼 클릭 |
| **조회** | 모든 To-do 자동 로드 및 표시 |
| **완료 토글** | 원형 버튼 클릭으로 완료/미완료 상태 변경 |
| **삭제** | X 버튼으로 To-do 제거 |
| **진행 추적** | 완료/전체 비율 시각화 및 진행 바 |

### 🔄 상태 관리
- React의 `useState`로 To-do 리스트 관리
- `useEffect`로 초기 데이터 로드
- 에러 처리 및 로딩 상태 표시

### 📡 API 통신
- **axios** 기반 REST API 호출
- CORS 지원
- 자동 에러 처리

## 📋 API 엔드포인트

### 기본 URL: `http://localhost:5000/api`

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/todos` | 모든 To-do 조회 |
| POST | `/todos` | 새로운 To-do 추가 |
| PATCH | `/todos/:id` | To-do 수정 (상태/내용) |
| DELETE | `/todos/:id` | To-do 삭제 |
| GET | `/health` | 서버 상태 확인 |

### 요청/응답 예시

**To-do 추가 요청**
```json
POST /api/todos
{
  "content": "새로운 할 일"
}
```

**응답**
```json
{
  "success": true,
  "data": {
    "id": "abc123xyz",
    "content": "새로운 할 일",
    "isCompleted": false,
    "createdAt": 1684567890000
  }
}
```

## 🛠 기술 스택

### 백엔드
- **Runtime**: Node.js
- **프레임워크**: Express.js
- **언어**: TypeScript
- **CORS**: cors 패키지

### 프론트엔드
- **라이브러리**: React 18
- **빌드 도구**: Vite 4
- **CSS**: Tailwind CSS 3
- **애니메이션**: Framer Motion 10
- **HTTP**: axios
- **언어**: TypeScript

## 📦 데이터 구조

```typescript
interface Todo {
  id: string;              // 고유 ID (랜덤 생성)
  content: string;         // 할 일 내용
  isCompleted: boolean;    // 완료 여부
  createdAt: number;       // 생성 시간 (Unix timestamp)
}
```

## 🔌 백엔드 기능

### 메모리 저장소 (In-Memory Store)
- 배열 기반 데이터 저장
- 서버 재시작 시 데이터 초기화
- 개발/테스트용으로 적합

### 에러 처리
모든 응답은 다음 형식을 따릅니다:
```json
{
  "success": true/false,
  "data": {...},        // 성공 시
  "error": "..."        // 실패 시
}
```

## 🌐 프론트엔드 기능

### 컴포넌트 계층
```
<App>
  └── <TodoContainer>           # 메인 로직
      ├── <TodoInput>           # 입력 폼
      └── <TodoList>            # 리스트 표시
          └── <TodoItem>        # 개별 항목
```

### 상태 관리
- `todos`: To-do 리스트
- `isLoading`: 로딩 상태
- `isAdding`: 추가 중 상태
- `error`: 에러 메시지

## ⚙️ 환경 설정

### 백엔드 환경 변수
```bash
PORT=5000                    # 서버 포트 (기본값)
CORS_ORIGIN=*                # CORS 허용 오리진
```

### 프론트엔드 환경 변수
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚢 배포 가이드

### 백엔드 배포 (Heroku 예시)
```bash
cd back
npm run build
# Procfile 생성
echo "web: npm start" > Procfile
git push heroku main
```

### 프론트엔드 배포 (Netlify 예시)
```bash
cd front
npm run build
# dist 폴더 배포
# 또는 Netlify CLI 사용
netlify deploy --prod --dir=dist
```

## 📝 주의사항

### 현재 제한사항
- 메모리 기반 저장소 (DB 없음)
- 서버 재시작 시 데이터 손실
- 단일 서버 인스턴스

### 프로덕션 환경 권장사항
1. **데이터베이스 연동** (MongoDB, PostgreSQL 등)
2. **인증/인가** (JWT, OAuth)
3. **보안** (HTTPS, Rate limiting)
4. **로깅** (Winston, Morgan)
5. **테스팅** (Jest, Supertest)

## 🐛 트러블슈팅

### 포트 충돌
```bash
# 다른 포트로 실행
PORT=5001 npm start          # 백엔드
VITE_PORT=3001 npm run dev   # 프론트엔드
```

### CORS 에러
백엔드의 `src/index.ts`에서 CORS 설정 확인:
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
```

### 모듈 못 찾음 에러
```bash
rm -rf node_modules
npm install
```

## 📚 더 자세한 정보

- [백엔드 README](./back/README.md) - 서버 설정 및 API 문서
- [프론트엔드 README](./front/README.md) - UI 설정 및 컴포넌트 가이드

## 📄 라이센스
ISC

## 👨‍💻 개발자
풀스택 To-do 리스트 프로젝트

---

**Happy Coding! 🎉**
