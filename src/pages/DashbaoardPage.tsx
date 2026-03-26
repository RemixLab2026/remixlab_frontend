import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  date: string;
  thumbnail: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  // 🌟 가급적 Effect 내부 로직을 안전하게 처리하고
  // 초기 렌더링 시 데이터가 꼬이지 않도록 합니다.
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
        // 파싱 에러 시 빈 배열로 초기화하거나 무시
        setProjects([]);
      }
    };

    loadProjects();
  }, []);

  const currentXp = 70;
  const maxXp = 100;
  const remainXp = maxXp - currentXp;
  const progressPercent = (currentXp / maxXp) * 100;

  return (
      <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
        {/* 레벨 진행도 */}
        <div className='relative overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_46%_0%,rgba(35,209,215,0.12),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />
          <div className='relative'>
            <p className='text-[11px] text-white/55'>레벨 진행도</p>
            <div className='mt-4 flex items-end justify-between'>
              <h2 className='text-[18px] font-semibold text-cyan-300'>Level 1</h2>
              <div className='flex items-center gap-4'>
                <span className='text-[12px] text-white/35'>Level 2까지 {remainXp}XP 남았어요!</span>
                <span className='text-[14px] font-semibold text-white'>{currentXp}/{maxXp} XP</span>
              </div>
            </div>
            <div className='mt-4 grid grid-cols-4 gap-1.5'>
              <div className='h-[16px] overflow-hidden rounded-[999px] bg-white/10'>
                <div className='h-full rounded-[999px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)]' style={{ width: `${Math.min(progressPercent * 1.35, 100)}%` }} />
              </div>
              <div className='h-[16px] rounded-[999px] bg-white/10' />
              <div className='h-[16px] rounded-[999px] bg-white/10' />
              <div className='h-[16px] rounded-[999px] bg-white/10' />
            </div>
          </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-5'>
          {/* 내 프로젝트 카드 */}
          <div className='relative min-h-[320px] overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-6 py-6 border border-white/5 backdrop-blur-md shadow-xl'>
            <p className='text-[11px] text-white/55 mb-5'>내 프로젝트 ({projects.length})</p>

            <div className='relative flex h-[calc(100%-40px)] flex-col'>
              {projects.length > 0 ? (
                  <div className='space-y-3 overflow-y-auto max-h-[220px] pr-2 custom-scrollbar'>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className='group flex items-center gap-4 rounded-xl bg-white/5 p-3 border border-white/5 hover:bg-white/10 transition-all cursor-pointer'
                        >
                          <div className='relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-black/20'>
                            <img src={project.thumbnail} alt='' className='h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity' />
                            <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
                              <span className='text-[10px] text-white/60'>▶</span>
                            </div>
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='truncate text-[14px] font-medium text-white/90'>{project.title}</p>
                            <p className='text-[11px] text-white/30'>{project.date}</p>
                          </div>
                          <span className='text-cyan-500/50 group-hover:text-cyan-400'>✦</span>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className='flex flex-1 flex-col items-center justify-center text-center'>
                    <div className='mb-4 text-[64px] leading-none text-white/16'>✦</div>
                    <p className='text-[14px] text-white/72'>아직 프로젝트가 없어요</p>
                    <button
                        onClick={() => navigate('/')}
                        className='mt-6 inline-flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] px-5 text-[13px] font-medium text-cyan-200 transition hover:opacity-90'
                    >
                      ＋ 첫 프로젝트 만들기
                    </button>
                  </div>
              )}
            </div>
          </div>

          {/* 진행 중 퀘스트 */}
          <div className='relative min-h-[320px] overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-6 py-6 border border-white/5 backdrop-blur-md'>
            <p className='text-[11px] text-white/55 mb-5'>진행중 퀘스트</p>
            <div className='flex h-full flex-col items-center justify-center text-center'>
              <p className='text-[14px] text-white/72'>모든 퀘스트를 완료했어요!</p>
              <button
                  onClick={() => navigate('/quest')}
                  className='mt-6 inline-flex h-[42px] cursor-pointer items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] px-6 text-[13px] font-medium text-cyan-200 transition hover:opacity-90'
              >
                전체보기
              </button>
            </div>
          </div>
        </div>
      </section>
  );
}