import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelProgressCard from '@/components/common/LevelProgressCard'; // 🌟 공통 컴포넌트 임포트

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
    const loadProjects = () => {
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
    };
    loadProjects();
  }, []);

  return (
      <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>

        {/* 🌟 공통 레벨 진행도 컴포넌트 렌더링 */}
        <LevelProgressCard />

        {/* 하단 카드 영역 */}
        <div className='mt-6 grid grid-cols-2 gap-6'>
          {/* 내 프로젝트 카드 */}
          <div className='relative min-h-[300px] overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-7 py-7 border border-white/5 shadow-2xl'>
            <p className='text-[12px] text-white/50 mb-6'>내 프로젝트 ({projects.length})</p>

            <div className='flex h-[calc(100%-40px)] flex-col'>
              {projects.length > 0 ? (
                  <div className='space-y-3 overflow-y-auto max-h-[200px] pr-2 custom-scrollbar'>
                    {projects.map((project) => (
                        <div key={project.id} className='group flex items-center gap-4 rounded-xl bg-white/5 p-3 hover:bg-white/10 transition-all cursor-pointer'>
                          <img src={project.thumbnail} alt='' className='h-12 w-20 rounded-lg object-cover' />
                          <div className='flex-1 min-w-0'>
                            <p className='truncate text-[14px] font-medium text-white'>{project.title}</p>
                            <p className='text-[11px] text-white/30'>{project.date}</p>
                          </div>
                          <span className='text-cyan-400 opacity-50 group-hover:opacity-100'>▶</span>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className='flex flex-1 flex-col items-center justify-center text-center'>
                    <div className='mb-5 text-[50px] opacity-20 text-white'>✦</div>
                    <p className='text-[15px] text-white/60'>아직 프로젝트가 없어요</p>
                    <button
                        onClick={() => navigate('/')}
                        className='mt-7 inline-flex h-[44px] cursor-pointer items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] px-6 text-[13px] font-semibold text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/10'
                    >
                      ＋ 첫 프로젝트 만들기
                    </button>
                  </div>
              )}
            </div>
          </div>

          {/* 진행 중 퀘스트 카드 */}
          <div className='relative min-h-[300px] overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-7 py-7 border border-white/5 shadow-2xl'>
            <p className='text-[12px] text-white/50 mb-6'>진행 중 퀘스트</p>
            <div className='flex h-full flex-col items-center justify-center text-center'>
              <p className='text-[15px] text-white/60'>모든 퀘스트를 완료했어요!</p>
              <button
                  onClick={() => navigate('/quest')}
                  className='mt-7 inline-flex h-[44px] cursor-pointer items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] px-8 text-[13px] font-semibold text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/10'
              >
                전체보기
              </button>
            </div>
          </div>
        </div>
      </section>
  );
}