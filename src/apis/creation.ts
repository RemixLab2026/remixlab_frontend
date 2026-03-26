import { axiosInstance } from './axiosInstance';
import type { PlotRequest, PlotResponse, PlotData, Scene } from '@/types/creation';

interface ApiError {
  errorCode: string;
  message: string;
}

interface BaseApiResponse<T> {
  success: boolean;
  data: T;
  error: ApiError | null;
}

interface PhotoData {
  imageUrl: string;
}

export interface TextToPhotoPayload {
  prompt: string;
}

export interface TextToPhotoData {
  url: string;
}

export interface TextToVideoPayload {
  prompt: string;
}

export interface TextToVideoData {
  videoId: number;
  soraId: string;
  message: string;
}

export interface CreatePhotoPayload extends Omit<PlotData, 'creationId'> {
  scenes: Scene[];
}

export interface SelectPhotoPayload {
  creationId: number;
  selections: { sceneNumber: number }[];
}

export interface SelectedPhotoItem {
  sceneNumber: number;
  url: string;
}

export interface SelectedPhotoResponseData {
  phots: SelectedPhotoItem[];
}

export interface CreateVideoPayload {
  creationId: number;
}

export interface CreateVideoResponseData {
  videoId: number;
  soraId: string;
  message: string;
}

export interface VideoStatusResponseData {
  videoId: number;
  status: string;
  url: string;
}

export type PhotoResponse = BaseApiResponse<PhotoData>;
export type TextToPhotoResponse = BaseApiResponse<TextToPhotoData>;
export type TextToVideoResponse = BaseApiResponse<TextToVideoData>;
export type SelectPhotoResponse = BaseApiResponse<null>;
export type PlotListResponse = BaseApiResponse<PlotData[]>;
export type SelectedPhotoResponse = BaseApiResponse<SelectedPhotoResponseData>;
export type CreateVideoResponse = BaseApiResponse<CreateVideoResponseData>;
export type VideoStatusResponse = BaseApiResponse<VideoStatusResponseData>;

// ------------------------------------------------------------------
// [실제 API] 백엔드 연동용 (나중에 다시 사용할 객체)
// ------------------------------------------------------------------
export const creationApi = {
  // 1. AI 플롯 생성
  createAIPlot: async (payload: PlotRequest): Promise<PlotResponse> => {
    const response = await axiosInstance.post<PlotResponse>('/api/v1/creation/make/plot', payload);
    return response.data;
  },

  // 2. 플롯 기반 AI 사진 생성
  createAIPhoto: async (payload: CreatePhotoPayload): Promise<PhotoResponse> => {
    const response = await axiosInstance.post<PhotoResponse>('/api/v1/creation/make/photo', payload);
    return response.data;
  },

  // 2-1. 텍스트 기반 AI 사진 생성
  createTextToPhoto: async (payload: TextToPhotoPayload): Promise<TextToPhotoResponse> => {
    const response = await axiosInstance.post<TextToPhotoResponse>('/api/v1/creation/text/make/photo', payload);
    return response.data;
  },

  // 2-2. 텍스트 기반 비디오 생성
  createTextToVideo: async (payload: TextToVideoPayload): Promise<TextToVideoResponse> => {
    const response = await axiosInstance.post<TextToVideoResponse>('/api/v1/creation/text/make/video', payload);
    return response.data;
  },

  // 3. 사진 선택하기
  selectPhoto: async (payload: SelectPhotoPayload): Promise<SelectPhotoResponse> => {
    const response = await axiosInstance.post<SelectPhotoResponse>('/api/v1/photo/select', payload);
    return response.data;
  },

  // 4. 플롯 목록 조회
  getPlotList: async (): Promise<PlotListResponse> => {
    const response = await axiosInstance.get<PlotListResponse>('/api/v1/creation/plots');
    return response.data;
  },

  // 5. 사용자가 선택한 사진 조회
  getSelectedPhotos: async (creationId: number): Promise<SelectedPhotoResponse> => {
    const response = await axiosInstance.get<SelectedPhotoResponse>('/api/v1/photo/view/selected', {
      params: { creationId },
    });
    return response.data;
  },

  // 6. 비디오 생성 요청
  createVideo: async (payload: CreateVideoPayload): Promise<CreateVideoResponse> => {
    const response = await axiosInstance.post<CreateVideoResponse>('/api/v1/creation/make/video', payload);
    return response.data;
  },

  // 7. 비디오 상태 조회
  getVideoStatus: async (videoId: number): Promise<VideoStatusResponse> => {
    const response = await axiosInstance.get<VideoStatusResponse>(`/api/v1/video/retrieve/status/${videoId}`);
    return response.data;
  },
};

// ------------------------------------------------------------------
// [더미 API] 프론트엔드 UI 테스트용 가짜 데이터 API
// ------------------------------------------------------------------
export const dummyCreationApi = {
  createAIPlot: async (payload: PlotRequest): Promise<PlotResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            creationId: 101,
            title: `${payload.user_input} 플롯`,
            genre: "판타지 / 어드벤처",
            mood: "신비롭고 몽환적인",
            mainCharacter: {
              name: "엘라 (Ella)",
              appearance: "은빛 머릿결에 낡은 탐험가 복장을 한 젊은 여성",
              personality: "호기심이 많고 미지의 세계를 두려워하지 않는 용감함"
            },
            worldSetting: "마법과 신비한 생물들이 살아 숨 쉬는 고대의 숲 '에테리아'",
            scenes: [
              {
                sceneNumber: 1,
                sceneDescription: "주인공이 안개 낀 신비한 숲의 입구에 도달하여 첫 발을 내딛습니다.",
                visualElements: "거대한 고목들, 공중에 떠다니는 반짝이는 홀씨, 짙은 안개",
                cameraAngle: "와이드 샷 (Wide Shot) - 숲의 거대함과 주인공의 작음을 대조",
                lighting: "나무 틈새로 쏟아지는 부드러운 빛 (God Rays)",
                emotion: "경이로움, 적막한",
                motion: "천천히 조심스럽게 걸어 들어가는 움직임"
              },
              {
                sceneNumber: 2,
                sceneDescription: "숲의 정령이 나타나 주인공의 주위를 맴돕니다.",
                visualElements: "반투명하게 빛나는 작은 정령, 놀란 표정의 주인공",
                cameraAngle: "오버 더 숄더 샷 (Over the Shoulder Shot)",
                lighting: "정령이 발산하는 푸르스름한 자체 발광",
                emotion: "놀라움, 호기심",
                motion: "정령이 빠르게 날아다니고 주인공의 시선이 이를 따라감"
              },
              {
                sceneNumber: 3,
                sceneDescription: "정령의 안내를 받아 고대 유적이 있는 숨겨진 공터에 도착합니다.",
                visualElements: "이끼 낀 거대한 석상, 맑은 연못, 마법진",
                cameraAngle: "로우 앵글 샷 (Low Angle Shot) - 유적의 웅장함을 강조",
                lighting: "달빛이 유적 중앙을 비추는 극적인 조명",
                emotion: "평화로운, 압도됨",
                motion: "천천히 걸어가며 주변을 둘러보는 패닝(Panning)"
              },
              {
                sceneNumber: 4,
                sceneDescription: "주인공이 석상 중심에 손을 얹자, 바닥의 마법진이 빛나며 숨겨져 있던 문이 열립니다.",
                visualElements: "빛나는 고대 마법진, 열리는 돌문, 흩날리는 먼지",
                cameraAngle: "하이 앵글 샷 (High Angle Shot) - 마법진 전체와 열리는 문을 한눈에 포착",
                lighting: "발밑에서 뿜어져 나오는 강렬하고 신비로운 황금빛",
                emotion: "긴장감 있는, 기대감",
                motion: "깜짝 놀라 뒤로 물러섰다가 결의를 다지며 다가감"
              },
              {
                sceneNumber: 5,
                sceneDescription: "문 너머에서 잊혀진 고대의 거대한 크리스탈 동력을 발견하며 미소 짓습니다.",
                visualElements: "거대한 푸른 크리스탈, 둥둥 떠다니는 고대 문자, 환한 미소",
                cameraAngle: "클로즈업 (Close-up) - 주인공의 얼굴과 크리스탈의 반사빛",
                lighting: "크리스탈에서 뿜어져 나오는 부드럽고 영롱한 푸른빛",
                emotion: "환상적인, 벅차오르는",
                motion: "크리스탈을 향해 천천히 손을 뻗는 움직임"
              }
            ]
          },
          error: null,
        });
      }, 1500); // 1.5초 지연
    });
  },

  createAIPhoto: async (payload: CreatePhotoPayload): Promise<PhotoResponse> => {
    console.log(`[더미 API] ${payload.scenes?.length}개의 씬 이미지 생성 요청`);

    // 팁: Unsplash의 'sig' 파라미터에 랜덤 숫자를 넣으면 캐싱을 피하고 다른 이미지를 가져옵니다.
    const randomId = Math.floor(Math.random() * 1000);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            // 키워드를 'fantasy,nature' 등으로 지정하여 분위기를 맞춤
            imageUrl: `https://images.unsplash.com/photo-1518709268805-4e9042af9f23?sig=${randomId}&auto=format&fit=crop&w=600`,
          },
          error: null,
        });
      }, 2000);
    });
  },

  createTextToPhoto: async (payload: TextToPhotoPayload): Promise<TextToPhotoResponse> => {
    // payload의 prompt를 콘솔에 찍어 활용 (ESLint 방지)
    console.log(`[더미 API] 이미지 생성 프롬프트: "${payload.prompt}"`);

    // 사용자가 입력한 프롬프트의 첫 단어를 키워드로 추출
    const keyword = payload.prompt.split(' ')[0] || 'fantasy';
    // 랜덤 숫자를 조합해 매번 다른 이미지가 나오도록 설정
    const randomId = Math.floor(Math.random() * 1000);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            // 추출한 keyword를 URL에 포함시켜 관련성 있는 이미지를 불러옵니다.
            // 예: "고양이" 입력 시 고양이 관련 이미지가 뜰 확률이 높음
            url: `https://images.unsplash.com/featured/?${keyword}&sig=${randomId}&auto=format&fit=crop&w=600&q=80`,
          },
          error: null,
        });
      }, 1500);
    });
  },

  createTextToVideo: async (payload: TextToVideoPayload): Promise<TextToVideoResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            videoId: 999,
            soraId: "sora-dummy-12345",
            // payload의 prompt를 응답 메시지에 직접 포함시켜 활용
            message: `[${payload.prompt}] 프롬프트로 비디오 생성이 시작되었습니다.`,
          },
          error: null,
        });
      }, 1500);
    });
  },

  selectPhoto: async (payload: SelectPhotoPayload): Promise<SelectPhotoResponse> => {
    // 어떤 creationId에 어떤 사진들을 선택했는지 콘솔에 출력하여 활용
    console.log(`[더미 API] Creation ID: ${payload.creationId}, 선택된 씬:`, payload.selections);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: null,
          error: null,
        });
      }, 500);
    });
  },
};