import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { dummyCreationApi } from '@/apis/creation';

export default function HomePage() {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState('');

    // 1. 플롯 생성 Mutation (더미 API 호출 - 크레딧 소모 X)
    const { mutate: handleCreatePlot, isPending: isPlotPending } = useMutation({
        mutationFn: () => dummyCreationApi.createAIPlot({ user_input: userInput }),
        onSuccess: (response) => {
            if (response.success) {
                console.log('생성된 플롯 (더미):', response.data);
                navigate('/generate/plot', { state: { plotData: response.data } });
            }
        },
        onError: (error) => {
            alert('플롯 생성 중 오류가 발생했습니다.');
            console.error(error);
        },
    });

    // 2. 텍스트 기반 이미지 생성 Mutation (더미 API 호출 - 크레딧 소모 X)
    const { mutate: handleCreateImage, isPending: isImagePending } = useMutation({
        mutationFn: () => dummyCreationApi.createTextToPhoto({ prompt: userInput }),
        onSuccess: (response) => {
            if (response.success) {
                // 격자 화면을 위해 5개 장면이 포함된 가짜 plotData를 생성 (다양한 장면 설명 추가)
                const dummyPlotData = {
                    title: userInput,
                    genre: '애니메이션',
                    mood: '시네마틱',
                    scenes: [
                        {
                            sceneNumber: 1,
                            sceneDescription: `평화로운 분위기 속에서 ${userInput}의 서막이 시작되는 장면`,
                            visualElements: '', cameraAngle: '', lighting: '', emotion: '', motion: ''
                        },
                        {
                            sceneNumber: 2,
                            sceneDescription: `예상치 못한 사건이 발생하며 ${userInput}의 긴장감이 고조되는 순간`,
                            visualElements: '', cameraAngle: '', lighting: '', emotion: '', motion: ''
                        },
                        {
                            sceneNumber: 3,
                            sceneDescription: `주인공이 결심을 굳히고 ${userInput}의 핵심으로 나아가는 모습`,
                            visualElements: '', cameraAngle: '', lighting: '', emotion: '', motion: ''
                        },
                        {
                            sceneNumber: 4,
                            sceneDescription: `${userInput}의 가장 화려하고 역동적인 클라이맥스 시퀀스`,
                            visualElements: '', cameraAngle: '', lighting: '', emotion: '', motion: ''
                        },
                        {
                            sceneNumber: 5,
                            sceneDescription: `모든 사건이 마무리되고 ${userInput}의 깊은 여운을 남기는 엔딩`,
                            visualElements: '', cameraAngle: '', lighting: '', emotion: '', motion: ''
                        },
                    ]
                };

                // 모든 장면에 생성된 동일한 더미 이미지 URL을 할당
                const dummyGeneratedImages: Record<number, string> = {
                    1: `https://images.unsplash.com/photo-1614850523296-d8c1af93d400?sig=1&auto=format&fit=crop&w=600`,
                    2: `https://images.unsplash.com/photo-1557683316-973673baf926?sig=2&auto=format&fit=crop&w=600`,
                    3: `https://images.unsplash.com/photo-1550684848-fac1c5b4e853?sig=3&auto=format&fit=crop&w=600`,
                    4: `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?sig=4&auto=format&fit=crop&w=600`,
                    5: `https://images.unsplash.com/photo-1557682250-33bd709cbe85?sig=5&auto=format&fit=crop&w=600`,
                };

                navigate('/generate/image', {
                    state: {
                        plotData: dummyPlotData,
                        generatedImages: dummyGeneratedImages,
                    },
                });
            }
        },
        onError: (error) => {
            alert('이미지 생성 중 오류가 발생했습니다.');
            console.error(error);
        },
    });

    // 3. 텍스트 기반 비디오 생성 Mutation (더미 API 호출 - 크레딧 소모 X)
    const { mutate: handleCreateVideo, isPending: isVideoPending } = useMutation({
        mutationFn: () => dummyCreationApi.createTextToVideo({ prompt: userInput }),
        onSuccess: (response) => {
            if (response.success) {
                console.log('생성된 비디오 요청 (더미):', response.data);

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
                    className='flex-1 cursor-pointer rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3.5 text-[13px] font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                >
                    {isPlotPending ? '✦ 생성 중...' : '✦ 플롯 생성'}
                </button>

                <button
                    onClick={() => {
                        if (!userInput.trim()) return alert('아이디어를 입력해주세요.');
                        handleCreateImage();
                    }}
                    disabled={isPending}
                    className='flex-1 cursor-pointer rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3.5 text-[13px] font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                >
                    {isImagePending ? '✦ 생성 중...' : '✦ 이미지 생성'}
                </button>

                <button
                    onClick={() => {
                        if (!userInput.trim()) return alert('아이디어를 입력해주세요.');
                        handleCreateVideo();
                    }}
                    disabled={isPending}
                    className='flex-1 cursor-pointer rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3.5 text-[13px] font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                >
                    {isVideoPending ? '✦ 생성 중...' : '✦ 영상 생성'}
                </button>
            </div>
        </section>
    );
}