# 백엔드 설정 및 실행 가이드

## 개요
Node.js + Express + TypeScript로 작성된 To-do 리스트 REST API 서버입니다.
메모리 내 배열을 사용하여 데이터를 관리하며, CORS 설정이 포함되어 있습니다.

## 설치

### 1. 의존성 설치
```bash
npm install
```

### 2. 필수 패키지
- **express**: 웹 프레임워크
- **cors**: CORS 설정
- **TypeScript**: 타입 안정성

## 스크립트

### 개발 모드 (Watch 모드)
```bash
npm run dev:watch
```
자동으로 파일 변경을 감지하고 서버를 재시작합니다.

### 개발 모드 (일회성)
```bash
npm run dev
```

### 빌드
```bash
npm run build
```
TypeScript를 JavaScript로 컴파일하여 `dist` 폴더에 생성합니다.

### 프로덕션 실행
```bash
npm run build
npm start
```

## API 엔드포인트

### 기본 URL
```
http://localhost:5000/api
```

### 1. 모든 To-do 조회
```
GET /api/todos
```
응답:
```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "content": "할 일 내용",
      "isCompleted": false,
      "createdAt": 1684000000000
    }
  ]
}
```

### 2. To-do 추가
```
POST /api/todos
Content-Type: application/json

{
  "content": "새로운 할 일"
}
```
응답:
```json
{
  "success": true,
  "data": {
    "id": "xyz789",
    "content": "새로운 할 일",
    "isCompleted": false,
    "createdAt": 1684000001000
  }
}
```

### 3. To-do 상태 수정 (완료/미완료 토글)
```
PATCH /api/todos/:id
Content-Type: application/json

{
  "isCompleted": true
}
```

### 4. To-do 삭제
```
DELETE /api/todos/:id
```
응답:
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

### 5. 헬스 체크
```
GET /health
```
응답:
```json
{
  "status": "OK"
}
```

## 데이터 구조

```typescript
interface Todo {
  id: string;              // 고유 ID (랜덤 문자열)
  content: string;         // 할 일 내용
  isCompleted: boolean;    // 완료 여부
  createdAt: number;       // 생성 시간 (Unix timestamp)
}
```

## 환경 변수

### PORT
기본값: `5000`
```bash
PORT=3001 npm start
```

### CORS_ORIGIN
기본값: `*` (모든 오리진 허용)
```bash
CORS_ORIGIN=http://localhost:3000 npm start
```

## 프로젝트 구조
```
back/
├── src/
│   ├── index.ts      # Express 서버 및 라우트 정의
│   ├── store.ts      # 메모리 내 To-do 저장소
│   └── types.ts      # TypeScript 타입 정의
├── package.json
├── tsconfig.json
└── .gitignore
```

## 주요 기능

### ✅ CRUD 작업
- 생성(Create): POST /api/todos
- 조회(Read): GET /api/todos
- 수정(Update): PATCH /api/todos/:id
- 삭제(Delete): DELETE /api/todos/:id

### ✅ 상태 관리
- 완료/미완료 토글
- 타임스탬프 추적

### ✅ 에러 처리
모든 엔드포인트에 대한 일관된 에러 응답:
```json
{
  "success": false,
  "error": "에러 메시지"
}
```

### ✅ CORS 설정
클라이언트의 모든 출처에서 요청을 받을 수 있습니다.

## 주의사항
- 현재는 **메모리 내 저장소**를 사용하므로 서버 재시작 시 데이터가 초기화됩니다.
- 프로덕션 환경에서는 데이터베이스(MongoDB, PostgreSQL 등)로 변경해야 합니다.
