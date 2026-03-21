import { useNavigate } from 'react-router-dom';

export default function PlotPage() {
  const navigate = useNavigate();

  return (
    <div className='p-10 text-white'>
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>

      <h1 className='text-xl mb-6'>스토리보드</h1>

      <div className='space-y-6'>
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className='flex gap-6 items-center'>
            <div className='w-[120px] h-[120px] bg-cyan-400 rounded-xl flex items-center justify-center text-2xl'>
              {num}
            </div>

            <div className='flex-1 bg-white/5 p-6 rounded-xl'>장면 설명</div>

            <button className='bg-cyan-400 px-4 py-2 rounded'>이미지 생성</button>
          </div>
        ))}
      </div>
    </div>
  );
}
