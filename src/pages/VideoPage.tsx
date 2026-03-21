import { useNavigate } from 'react-router-dom';

export default function VideoPage() {
  const navigate = useNavigate();

  return (
    <div className='p-10 text-white'>
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>

      <h1 className='text-xl mb-6'>영상 생성 완료</h1>

      <div className='grid grid-cols-5 gap-4 mb-10'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='h-[120px] bg-white/10 rounded-xl'></div>
        ))}
      </div>

      <div className='flex gap-4'>
        <button className='bg-white/10 px-6 py-3 rounded'>다운로드</button>

        <button className='bg-cyan-400 px-6 py-3 rounded text-black'>프로젝트 저장</button>
      </div>
    </div>
  );
}
