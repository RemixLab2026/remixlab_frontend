import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { creationApi } from '@/apis/creation';

export const useVideoCreation = (creationId?: number, enabledSelectedPhotos?: boolean) => {
  const [videoId, setVideoId] = useState<number | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoStatus, setVideoStatus] = useState<string>('');
  const [isPolling, setIsPolling] = useState(false);

  // 1. 사용자가 선택한 사진 조회
  const selectedPhotosQuery = useQuery({
    queryKey: ['selectedPhotos', creationId],
    queryFn: () => creationApi.getSelectedPhotos(creationId as number),
    enabled: !!creationId && !!enabledSelectedPhotos,
  });

  // 2. 비디오 생성 요청
  const createVideoMutation = useMutation({
    mutationFn: (payload: { creationId: number }) => creationApi.createVideo(payload),
    onSuccess: (response) => {
      if (!response.success) return;

      setVideoId(response.data.videoId);
      setVideoStatus('processing');
      setIsPolling(true);
    },
  });

  // 3. polling
  useEffect(() => {
    if (!videoId || !isPolling) return;

    const interval = window.setInterval(async () => {
      try {
        const response = await creationApi.getVideoStatus(videoId);

        if (!response.success) return;

        setVideoStatus(response.data.status);

        if (response.data.status.toLowerCase() === 'complete') {
          setVideoUrl(response.data.url);
          setIsPolling(false);
          window.clearInterval(interval);
        }
      } catch (error) {
        console.error('video polling error:', error);
      }
    }, 3000);

    return () => window.clearInterval(interval);
  }, [videoId, isPolling]);

  return {
    selectedPhotosQuery,
    createVideoMutation,
    videoId,
    videoUrl,
    videoStatus,
    isPolling,
  };
};
