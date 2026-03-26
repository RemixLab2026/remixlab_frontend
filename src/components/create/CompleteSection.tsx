import { useNavigate } from 'react-router-dom';
import StepNavigation from '@/components/create/StepNavigation';

interface CompleteSectionProps {
  showStepNav: boolean;
  videoUrl?: string;
  isLoading?: boolean;
  sceneCount?: number;
  // 프로젝트 저장에 필요한 부가 정보 (선택 사항)
  creationId?: number;
  title?: string;
}

export default function CompleteSection({
                                          showStepNav,
                                          videoUrl,
                                          isLoading,
                                          sceneCount = 5,
                                          creationId,
                                          title
                                        }: CompleteSectionProps) {
  const navigate = useNavigate();
  const videoPlaceholders = Array.from({ length: sceneCount }, (_, i) => i + 1);

  // 🌟 2. 프로젝트 저장 로직 (LocalStorage 활용)
  const handleSaveProject = () => {
    const newProject = {
      id: creationId || Date.now(),
      title: title || "새로운 AI 영상 프로젝트",
      date: new Date().toLocaleDateString(),
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300", // 더미 썸네일
    };

    // 기존 데이터 가져오기
    const savedProjects = JSON.parse(localStorage.getItem('my_projects') || '[]');
    // 새로운 프로젝트 추가
    localStorage.setItem('my_projects', JSON.stringify([newProject, ...savedProjects]));

    alert('프로젝트가 대시보드에 저장되었습니다!');
    navigate('/dashboard'); // 대시보드로 이동
  };

  return (
      <section className='pb-16 pt-8'>
        {showStepNav && <StepNavigation currentStep='complete' />}

        <div className='relative overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-10 py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>

          {/* 상단 텍스트 영역 */}
          <div className='relative mb-14 text-center'>
            <h2 className='mb-4 text-[26px] font-bold tracking-tight text-white'>
              {isLoading ? '영상 생성 중입니다...' : '콘텐츠가 완성되었습니다!'}
            </h2>
            <p className='text-[15px] font-medium text-white/40'>
              총 {sceneCount}개의 장면으로 구성된 콘텐츠가 생성되었습니다.
            </p>
          </div>

          {/* 비디오 썸네일 그리드 영역 */}
          <div className='relative mb-14 flex min-h-[160px] w-full items-center justify-center'>
            {isLoading ? (
                /* 로딩 중일 때 */
                <div className='flex flex-col items-center gap-5 py-10'>
                  <div className='h-12 w-12 animate-spin rounded-full border-[3px] border-white/10 border-t-cyan-400' />
                  <p className='text-[14px] text-white/60'>AI가 영상을 만들고 있어요...</p>
                </div>
            ) : (
                /* 완료 시: 5개의 작은 영상 가로 배열 */
                <div className='flex w-full flex-wrap items-center justify-center gap-4 px-4'>
                  {videoPlaceholders.map((num) => (
                      <div
                          key={num}
                          className='group relative aspect-[16/10] w-[200px] shrink-0 cursor-pointer overflow-hidden rounded-[16px] border border-white/5 bg-[#161b22] shadow-xl transition-all duration-300 hover:scale-[1.05] hover:border-white/20'
                      >
                        {/* 영상이 있다면 배경으로 깔아주기 */}
                        {videoUrl && (
                            <video
                                src={videoUrl}
                                className='h-full w-full object-cover opacity-40 mix-blend-screen transition-opacity group-hover:opacity-60'
                                muted
                                loop
                                playsInline
                            />
                        )}

                        {/* 재생 버튼 아이콘 오버레이 */}
                        <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/20 to-transparent'>
                          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20'>
                            <span className='ml-1 text-[18px] text-white/50 group-hover:text-white/80'>▶</span>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* 하단 액션 버튼 */}
          <div className='relative flex items-center justify-center gap-3'>
            <a
                href={videoUrl}
                download
                className={`flex h-[50px] min-w-[140px] items-center justify-center rounded-[12px] bg-[#22282c] px-6 text-[14px] font-medium text-white/80 border border-white/5 transition-all hover:bg-[#2c3338] ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
            >
              다운로드
            </a>

            {/* 🌟 cursor-pointer 추가 및 handleSaveProject 연결 */}
            <button
                onClick={handleSaveProject}
                disabled={isLoading}
                className={`flex h-[50px] min-w-[160px] cursor-pointer items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#1e3a3d_0%,#132629_100%)] px-6 text-[14px] font-bold text-[#44dde4] border border-[#44dde4]/30 shadow-[0_5px_20px_rgba(68,221,228,0.1)] transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              프로젝트 저장
            </button>
          </div>
        </div>
      </section>
  );
}