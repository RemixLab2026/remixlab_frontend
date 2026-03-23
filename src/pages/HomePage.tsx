import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { creationApi } from '@/apis/creation';

export default function HomePage() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');

  // 플롯 생성 Mutation
  const { mutate: handleCreatePlot, isPending: isPlotPending } = useMutation({
    mutationFn: () => creationApi.createAIPlot({ user_input: userInput }),
    onSuccess: (response) => {
      if (response.success) {
        console.log('생성된 플롯:', response.data);
        navigate('/generate/plot', { state: { plotData: response.data } });
      }
    },
    onError: (error) => {
      alert('플롯 생성 중 오류가 발생했습니다.');
      console.error(error);
    },
  });

  // 텍스트 기반 이미지 생성 Mutation
  const { mutate: handleCreateImage, isPending: isImagePending } = useMutation({
    mutationFn: () => creationApi.createTextToPhoto({ prompt: userInput }),
    onSuccess: (response) => {
      if (response.success) {
        console.log('생성된 이미지:', response.data);

        navigate('/generate/image', {
          state: {
            imageUrl: response.data.url,
            prompt: userInput,
          },
        });
      } else {
        alert(response.error?.message || '이미지 생성에 실패했습니다.');
      }
    },
    onError: (error) => {
      alert('이미지 생성 중 오류가 발생했습니다.');
      console.error(error);
    },
  });

  // 텍스트 기반 비디오 생성 Mutation
  const { mutate: handleCreateVideo, isPending: isVideoPending } = useMutation({
    mutationFn: () => creationApi.createTextToVideo({ prompt: userInput }),
    onSuccess: (response) => {
      if (response.success) {
        console.log('생성된 비디오 요청:', response.data);

        navigate('/generate/video', {
          state: {
            videoId: response.data.videoId,
            soraId: response.data.soraId,
            message: response.data.message,
            prompt: userInput,
          },
        });
      } else {
        alert(response.error?.message || '비디오 생성에 실패했습니다.');
      }
    },
    onError: (error) => {
      alert('비디오 생성 중 오류가 발생했습니다.');
      console.error(error);
    },
  });

  const isPending = isPlotPending || isImagePending || isVideoPending;

  return (
    <section className='flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-4 pb-24 pt-8'>
      <p className='mb-6 text-[18px] text-white/62'>
        아이디어만으로 시작하는 <span className='font-semibold text-white'>AI기반 창작 실험실</span>
      </p>

      <div
        className='mb-2'
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.38) 5%, rgba(255,255,255,1) 25%)',
          maskImage:
            'linear-gradient(to right, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.38) 5%, rgba(255,255,255,1) 25%)',
        }}
      >
        <img src='/big.png' alt='Remixlab' className='w-[750px] max-w-full opacity-95' />
      </div>

      <div className='mt-10 flex w-full max-w-[850px] items-center gap-5 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-7 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-md'>
        <span className='text-[34px] text-white/60'>＋</span>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder='당신의 아이디어를 입력해주세요.'
          className='w-full bg-transparent text-[18px] text-white outline-none placeholder:text-white/28'
          disabled={isPending}
        />
      </div>

      <div className='mt-6 flex w-full max-w-[850px] gap-3'>
        <button
          onClick={() => {
            if (!userInput.trim()) return alert('아이디어를 입력해주세요.');
            handleCreatePlot();
          }}
          disabled={isPending}
          className='flex-1 rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3.5 text-[13px] font-semibold text-black transition hover:opacity-90 disabled:opacity-50'
        >
          {isPlotPending ? '✦ 생성 중...' : '✦ 플롯 생성'}
        </button>

        <button
          onClick={() => {
            if (!userInput.trim()) return alert('아이디어를 입력해주세요.');
            handleCreateImage();
          }}
          disabled={isPending}
          className='flex-1 rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3.5 text-[13px] font-semibold text-black transition hover:opacity-90 disabled:opacity-50'
        >
          {isImagePending ? '✦ 생성 중...' : '✦ 이미지 생성'}
        </button>

        <button
          onClick={() => {
            if (!userInput.trim()) return alert('아이디어를 입력해주세요.');
            handleCreateVideo();
          }}
          disabled={isPending}
          className='flex-1 rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3.5 text-[13px] font-semibold text-black transition hover:opacity-90 disabled:opacity-50'
        >
          {isVideoPending ? '✦ 생성 중...' : '✦ 영상 생성'}
        </button>
      </div>
    </section>
  );
}
