import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelProgressCard from '@/components/common/LevelProgressCard';

interface Project {
  id: number;
  title: string;
  date: string;
  thumbnail: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('my_projects');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          setProjects(parsedData);
        }
      }
    } catch (error) {
      console.error('프로젝트를 불러오는 중 오류가 발생했습니다:', error);
      setProjects([]);
    }
  }, []);

  return (
    <section className='mx-auto max-w-[1280px] px-4 pb-12 pt-6 md:px-8 md:pb-16 md:pt-10'>
      {/* 레벨 카드 */}
      <LevelProgressCard />

      {/* 카드 영역 */}
      <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
        {/* 내 프로젝트 카드 */}
        <div className='relative min-h-[260px] overflow-hidden rounded-[18px] border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-5 py-5 shadow-2xl md:min-h-[300px] md:rounded-[24px] md:px-7 md:py-7'>
          <p className='mb-4 text-[12px] text-white/50 md:mb-6'>내 프로젝트 ({projects.length})</p>

          <div className='flex h-[calc(100%-32px)] flex-col md:h-[calc(100%-40px)]'>
            {projects.length > 0 ? (
              <div className='max-h-[180px] space-y-3 overflow-y-auto pr-1 custom-scrollbar md:max-h-[200px] md:pr-2'>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className='group flex cursor-pointer items-center gap-3 rounded-lg bg-white/5 p-2.5 transition-all hover:bg-white/10 md:gap-4 md:rounded-xl md:p-3'
                  >
                    <img
                      src={project.thumbnail}
                      alt=''
                      className='h-10 w-16 rounded-md object-cover md:h-12 md:w-20 md:rounded-lg'
                    />

                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-[13px] font-medium text-white md:text-[14px]'>{project.title}</p>
                      <p className='text-[10px] text-white/30 md:text-[11px]'>{project.date}</p>
                    </div>

                    <span className='text-cyan-400 opacity-50 group-hover:opacity-100'>▶</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-1 flex-col items-center justify-center text-center'>
                <div className='mb-4 text-[40px] text-white opacity-20 md:mb-5 md:text-[50px]'>✦</div>

                <p className='text-[14px] text-white/60 md:text-[15px]'>아직 프로젝트가 없어요</p>

                <button
                  onClick={() => navigate('/')}
                  className='mt-6 inline-flex h-[42px] items-center justify-center rounded-[12px] border border-cyan-500/20 bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] px-5 text-[12px] font-semibold text-cyan-300 hover:bg-cyan-500/10 md:mt-7 md:h-[44px] md:px-6 md:text-[13px]'
                >
                  ＋ 첫 프로젝트 만들기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 퀘스트 카드 */}
        <div className='relative min-h-[260px] overflow-hidden rounded-[18px] border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-5 py-5 shadow-2xl md:min-h-[300px] md:rounded-[24px] md:px-7 md:py-7'>
          <p className='mb-4 text-[12px] text-white/50 md:mb-6'>진행 중 퀘스트</p>

          <div className='flex h-full flex-col items-center justify-center text-center'>
            <p className='text-[14px] text-white/60 md:text-[15px]'>모든 퀘스트를 완료했어요!</p>

            <button
              onClick={() => navigate('/quest')}
              className='mt-6 inline-flex h-[42px] items-center justify-center rounded-[12px] border border-cyan-500/20 bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] px-6 text-[12px] font-semibold text-cyan-300 hover:bg-cyan-500/10 md:mt-7 md:h-[44px] md:px-8 md:text-[13px]'
            >
              전체보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
