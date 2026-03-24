# RemixLab 2026 - AI Multi-Modal Creation Platform

RemixLab은 사용자의 아이디어를 바탕으로 AI 플롯 생성, 스토리보드 구성, 이미지 및 비디오 제작까지 이어지는 원스톱 AI 크리에이티브 플랫폼입니다.

## 🚀 주요 기능 (Key Features)

* **AI 플롯 생성**: 간단한 텍스트 입력을 통해 제목, 장르, 분위기, 캐릭터 설정 및 상세 장면(Scene)이 포함된 플롯을 생성합니다.
* **스토리보드 및 이미지 생성**: 생성된 플롯의 각 장면별로 AI 이미지를 생성하고 시각화합니다.
* **AI 비디오 제작**: 선택한 이미지와 시나리오를 바탕으로 고품질 AI 비디오를 생성합니다.
* **퀘스트 시스템**: 사용자의 활동에 따른 목표를 제시하고 진행 상황을 확인합니다.

## 🛠 기술 스택 (Tech Stack)

* **Framework**: React 18, Vite
* **Language**: TypeScript
* **State Management**: Zustand (Auth 상태 관리)
* **Styling**: CSS Modules / Tailwind CSS
* **API Client**: Axios

## 📂 프로젝트 구조 (Project Structure)

```text
src/
├── apis/          # API 호출 함수 (Auth, Creation, Quest 등)
├── components/    # 재사용 가능한 UI 컴포넌트
│   ├── auth/      # 로그인/회원가입 관련
│   ├── common/    # 레이아웃 및 공통 컴포넌트
│   └── create/    # 제작 단계별 컴포넌트
├── hooks/         # 커스텀 훅 (비즈니스 로직 분리)
├── pages/         # 페이지 단위 컴포넌트 (Dashboard, Create, Quest 등)
├── routes/        # 라우팅 설정 및 가드 (ProtectedRoute)
├── store/         # 전역 상태 관리 (Zustand)
└── types/         # TypeScript 타입 정의 파일
```

## ⚙️ 시작하기 (Getting Started)

### 환경 변수 설정
`.env.development` 또는 `.env.production` 파일을 생성하고 필요한 API 베이스 URL을 설정하세요.

### 설치 및 실행
```bash
# 패키지 설치
yarn install

# 로컬 개발 서버 실행
yarn dev

# 빌드
yarn build
```

## 🔐 테스트 계정
현재 더미 데이터 모드 또는 로컬 환경에서 다음 계정으로 테스트가 가능합니다.
* **Username**: `test1`
* **Password**: `test1`
