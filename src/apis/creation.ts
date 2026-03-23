import { axiosInstance } from './axiosInstance';
import type { PlotRequest, PlotResponse, PlotData, Scene } from '@/types/creation';

interface BaseApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}

interface PhotoData {
  imageUrl: string;
}

export interface CreatePhotoPayload extends Omit<PlotData, 'creationId'> {
  scenes: Scene[];
}

export interface SelectPhotoPayload {
  creationId: number;
  selections: { sceneNumber: number }[];
}

export type PhotoResponse = BaseApiResponse<PhotoData>;
export type SelectPhotoResponse = BaseApiResponse<null>;
export type PlotListResponse = BaseApiResponse<PlotData[]>;

export const creationApi = {
  // 1. AI 플롯 생성
  createAIPlot: async (payload: PlotRequest): Promise<PlotResponse> => {
    const response = await axiosInstance.post<PlotResponse>('/api/v1/creation/make/plot', payload);
    return response.data;
  },

  // 2. AI 사진 생성
  createAIPhoto: async (payload: CreatePhotoPayload): Promise<PhotoResponse> => {
    const response = await axiosInstance.post<PhotoResponse>('/api/v1/creation/make/photo', payload);
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
};
