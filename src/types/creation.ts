export interface Scene {
    sceneNumber: number;
    sceneDescription: string;
    visualElements: string;
    cameraAngle: string;
    lighting: string;
    emotion: string;
    motion: string;
}

export interface PlotData {
    creationId: number;
    title: string;
    genre: string;
    mood: string;
    mainCharacter: {
        name: string;
        appearance: string;
        personality: string;
    };
    worldSetting: string;
    scenes: Scene[];
}

export interface PlotResponse {
    success: boolean;
    data: PlotData;
    error: string | null;
}

export interface PlotRequest {
    user_input: string;
}