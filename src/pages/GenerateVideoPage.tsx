import { useLocation, useNavigate } from 'react-router-dom';

export default function GenerateVideoPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};
    const { videoId, prompt } = state;

    // 1. 실제 MP4 다운로드 흉내 (더미 영상 파일 주소 활용)
    const handleDownload = () => {
        const dummyVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // 테스트용 MP4
        const link = document.createElement('a');
        link.href = dummyVideoUrl;
        link.setAttribute('download', 'remixlab_video.mp4');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 2. 프로젝트 저장 로직 (LocalStorage 활용)
    const handleSaveProject = () => {
        const newProject = {
            id: videoId || Date.now(),
            title: prompt || "새로운 AI 영상 프로젝트",
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

    if (!videoId) return null; // 데이터 없을 시 처리 (생략 가능)

    return (
        <section className='mx-auto flex min-h-[calc(100vh-88px)] max-w-[1400px] flex-col items-center justify-center px-8 pb-20'>
            <div className='mb-14 text-center'>
                <h2 className='mb-4 text-[34px] font-bold tracking-tight text-white'>콘텐츠가 완성되었습니다!</h2>
                <p className='text-[16px] font-medium text-white/40'>총 5개의 장면으로 구성된 콘텐츠가 생성되었습니다.</p>
            </div>

            <div className='mb-20 flex w-full items-center justify-center gap-4 overflow-x-auto px-4 pb-6'>
                {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className='group relative aspect-[16/10] w-[230px] shrink-0 cursor-pointer overflow-hidden rounded-[20px] bg-[#1a1f24] border border-white/5 shadow-2xl transition-all duration-300 hover:scale-[1.05]'>
                        <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] to-transparent'>
                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md'>
                                <div className='ml-1 text-[20px] text-white/40'>▶</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex items-center gap-4'>
                <button
                    onClick={handleDownload}
                    className='cursor-pointer flex h-[54px] min-w-[150px] items-center justify-center rounded-[14px] bg-[#22282c] px-8 text-[15px] font-semibold text-white/90 border border-white/5 hover:bg-[#2c3338] transition-all'
                >
                    다운로드
                </button>

                <button
                    onClick={handleSaveProject}
                    className='cursor-pointer flex h-[54px] min-w-[200px] items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#1e3a3d_0%,#132629_100%)] px-10 text-[15px] font-bold text-[#44dde4] border border-[#44dde4]/30 shadow-[0_10px_30px_rgba(68,221,228,0.1)] transition-all hover:brightness-110'
                >
                    프로젝트 저장
                </button>
            </div>
        </section>
    );
}