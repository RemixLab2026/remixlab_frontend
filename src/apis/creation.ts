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
  // 실제 응답이 photos면 phots -> photos로 변경
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
export type SelectPhotoResponse = BaseApiResponse<null>;
export type PlotListResponse = BaseApiResponse<PlotData[]>;
export type SelectedPhotoResponse = BaseApiResponse<SelectedPhotoResponseData>;
export type CreateVideoResponse = BaseApiResponse<CreateVideoResponseData>;
export type VideoStatusResponse = BaseApiResponse<VideoStatusResponseData>;

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
