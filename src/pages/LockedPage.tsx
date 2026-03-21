import { useNavigate } from 'react-router-dom';

export default function LockedPage() {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center text-white'>
      <div className='text-6xl mb-6'>🔒</div>

      <h2 className='text-xl mb-2'>Level 3에서 해금</h2>

      <p className='text-white/50 mb-6'>영상 생성 기능은 Level 3부터 사용 가능</p>

      <button onClick={() => navigate('/quest')} className='bg-cyan-400 px-6 py-3 rounded text-black'>
        퀘스트 수행하기
      </button>
    </div>
  );
}
