# 프론트엔드 설정 및 실행 가이드

## 개요
Vite + React + TypeScript + Tailwind CSS로 구축된 토스(Toss) 스타일의 To-do 리스트 애플리케이션입니다.

## 설치

### 1. 의존성 설치
```bash
npm install
```

### 2. 필수 패키지
- **react**: UI 라이브러리
- **react-dom**: React DOM 렌더링
- **vite**: 고속 빌드 도구
- **tailwindcss**: CSS 프레임워크
- **axios**: HTTP 클라이언트
- **framer-motion**: 애니메이션 라이브러리

## 스크립트

### 개발 서버 실행
```bash
npm run dev
```
자동으로 브라우저를 열고 `http://localhost:3000`에서 실행됩니다.

### 프로덕션 빌드
```bash
npm run build
```
최적화된 코드가 `dist` 폴더에 생성됩니다.

### 빌드 결과 미리보기
```bash
npm run preview
```

## 환경 변수

### API 기본 URL
기본값: `http://localhost:5000/api`

환경 변수로 변경:
```bash
REACT_APP_API_URL=http://api.example.com npm run dev
```

또는 `.env` 파일 생성:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 프로젝트 구조
```
front/
├── src/
│   ├── components/
│   │   ├── TodoContainer.tsx    # 메인 컨테이너 (상태 관리)
│   │   ├── TodoList.tsx         # To-do 리스트 표시
│   │   ├── TodoItem.tsx         # 개별 To-do 아이템
│   │   └── TodoInput.tsx        # 입력 폼
│   ├── api/
│   │   └── todoAPI.ts           # 백엔드 API 호출
│   ├── types/
│   │   └── index.ts             # TypeScript 타입 정의
│   ├── App.tsx                  # 메인 앱 컴포넌트
│   ├── main.tsx                 # 엔트리 포인트
│   └── index.css                # 전역 스타일
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── package.json
├── tsconfig.json
└── .gitignore
```

## 디자인 시스템

### 토스(Toss) 색상 팔레트
```css
- 배경색: #F2F4F6 (매우 연한 회색)
- 주요 색상: #3182F6 (선명한 파란색)
- 카드 배경: #FFFFFF (흰색)
- 테두리: #E8EAED (아주 연한 그레이)
- 텍스트: #333333 (진한 회색)
- 텍스트 라이트: #999999 (밝은 회색)
```

### Tailwind 커스텀 설정
`tailwind.config.ts`에서 다음 커스텀 클래스 사용 가능:
```
- bg-toss-bg: 배경 색상
- bg-toss-primary: 주요 버튼 색상
- bg-toss-card: 카드 배경
- border-toss-border: 테두리 색상
- text-toss-text: 기본 텍스트
- text-toss-text-light: 밝은 텍스트
- rounded-toss: 12px 둥근 모서리
```

## 주요 기능

### 📝 To-do 관리
- ✅ To-do 추가 (엔터키 또는 버튼 클릭)
- ✅ 완료/미완료 토글 (원형 버튼 클릭)
- ✅ To-do 삭제 (X 버튼)
- ✅ 진행 상황 표시 (진행 바)

### 🎨 UI/UX 특징
- 깔끔한 토스 스타일 디자인
- Hover 효과로 인터랙티브한 경험
- 부드러운 애니메이션 (Framer Motion)
- 반응형 레이아웃 (모바일 친화적)

### 🔄 상태 관리
- `useState`: To-do 리스트 상태
- `useEffect`: 초기 데이터 로드
- 로딩 상태 및 에러 처리

### 📡 API 연동
- **axios**: HTTP 요청
- 자동 CORS 처리
- RESTful API 호출

## 백엔드 연결

### 1. 백엔드 서버 실행
```bash
cd ../back
npm install
npm run dev
```

### 2. 프론트엔드 서버 실행
```bash
# 새 터미널에서
npm run dev
```

### 3. 브라우저에서 확인
http://localhost:3000에서 애플리케이션이 자동으로 열립니다.

## 컴포넌트 설명

### TodoContainer
메인 컨테이너 컴포넌트로 다음 기능을 담당합니다:
- API를 통한 To-do 데이터 관리
- 상태 업데이트 로직
- 에러 처리

### TodoList
To-do 아이템들을 표시하는 컴포넌트:
- Framer Motion으로 애니메이션 처리
- 비어있는 상태 표시
- 동적 렌더링

### TodoItem
개별 To-do 아이템 컴포넌트:
- 완료 상태 표시
- 취소선 효과
- 삭제 버튼
- Hover 애니메이션

### TodoInput
To-do 입력 폼 컴포넌트:
- 엔터키 지원
- 폼 유효성 검사
- 로딩 상태 표시

## 네트워킹 API 호출

### todoAPI.ts
모든 API 호출을 관리하는 유틸리티:

```typescript
// 모든 To-do 조회
const todos = await todoAPI.getAllTodos();

// 새로운 To-do 추가
const newTodo = await todoAPI.createTodo({ content: '새로운 할 일' });

// To-do 수정
const updated = await todoAPI.updateTodo(id, { isCompleted: true });

// To-do 삭제
await todoAPI.deleteTodo(id);
```

## 트러블슈팅

### 백엔드 연결 오류
**에러 메시지**: `Failed to fetch todos`

**해결 방법**:
1. 백엔드 서버가 실행 중인지 확인 (`npm run dev`)
2. 포트 5000이 사용 가능한지 확인
3. CORS 설정이 올바른지 확인 (back/src/index.ts)

### 스타일이 적용되지 않음
**해결 방법**:
```bash
# 재설치
rm -rf node_modules
npm install
npm run dev
```

### Tailwind CSS 클래스가 먹히지 않음
**확인 사항**:
1. `index.css`에 Tailwind 지시어 확인:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. `tailwind.config.ts`의 content 경로 확인

## 성능 최적화

### 빌드 분석
```bash
npm run build
```

### 개발 서버 성능
- Vite의 빠른 HMR (Hot Module Replacement)
- 번들 크기 최소화

## 배포

### Netlify/Vercel 배포
1. 프로젝트를 GitHub에 푸시
2. Netlify/Vercel 연결
3. 환경 변수 설정:
   ```
   REACT_APP_API_URL=https://your-api-domain.com
   ```

### 커스텀 서버 배포
```bash
npm run build
# dist 폴더를 웹 서버에 배포
```

## 라이센스
ISC
