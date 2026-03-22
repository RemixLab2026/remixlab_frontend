export type CreateStep = 'idea' | 'storyboard' | 'image' | 'video' | 'complete';

export interface StoryboardItem {
  id: number;
  mood: string;
  tags: string[];
  description: string;
  imageGenerated: boolean;
}
