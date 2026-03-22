interface TokenModalProps {
  onClose: () => void;
}

export default function TokenModal({ onClose }: TokenModalProps) {
  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[8px]'>
      <div className='relative w-full max-w-[620px] rounded-[28px] bg-[linear-gradient(180deg,rgba(41,53,61,0.96),rgba(22,28,35,0.96))] px-10 py-12 shadow-[0_20px_80px_rgba(0,0,0,0.5)]'>
        <button
          onClick={onClose}
          className='absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[22px] text-white/70'
        >
          ×
        </button>

        <p className='mb-10 text-center text-[28px] font-semibold text-white'>토큰 구매가 필요합니다!</p>

        <button className='h-[58px] w-full rounded-[16px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] text-[20px] font-semibold text-black transition hover:opacity-90'>
          구매하기
        </button>
      </div>
    </div>
  );
}
