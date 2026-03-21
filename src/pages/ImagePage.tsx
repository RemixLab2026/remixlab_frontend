import { useNavigate } from 'react-router-dom';

export default function ImagePage() {
  const navigate = useNavigate();

  return (
    <div className='p-10 text-white'>
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>

      <h1 className='text-xl mb-6'>이미지 미리보기</h1>

      <div className='grid grid-cols-3 gap-6'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='bg-white/5 p-6 rounded-xl'>
            <div className='h-[160px] bg-black/40 rounded mb-3'></div>
            <p>장면 {i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
