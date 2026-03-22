import ActionButton from '@/components/create/ActionButton';
import StepNavigation from '@/components/create/StepNavigation';
import { useNavigate } from 'react-router-dom';

interface VideoLockedSectionProps {
  showStepNav: boolean;
  onGoComplete?: () => void;
  completeEnabled?: boolean;
}

export default function VideoLockedSection({ showStepNav, onGoComplete, completeEnabled }: VideoLockedSectionProps) {
  const navigate = useNavigate();

  return (
    <section className='pb-16 pt-8'>
      {showStepNav && <StepNavigation currentStep='video' />}

      <h2 className='mb-6 text-[20px] font-semibold text-white'>영상 생성</h2>

      <div className='relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

        <div className='relative mb-5 text-[72px] text-white/68'>
          {' '}
          <img src='/lock.png' alt='잠금' className='h-[48px] w-[48x] object-fill' />
        </div>
        <p className='relative mb-2 text-[28px] font-semibold text-white'>Level 3에서 해금</p>
        <p className='relative mb-8 text-[15px] text-white/42'>영상 생성 기능은 Level 3부터 사용할 수 있습니다</p>

        <button
          onClick={() => navigate('/quest')}
          className='relative h-[44px] min-w-[132px] rounded-[12px] bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] px-5 text-[13px] font-medium text-cyan-200 shadow-[0_10px_22px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:opacity-90'
        >
          <span className='absolute inset-0 rounded-[12px] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.20),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_38%)]' />
          <span className='relative'>퀘스트 수행하기</span>
        </button>
      </div>

      {typeof completeEnabled === 'boolean' && onGoComplete && (
        <div className='mt-7 flex justify-end'>
          <ActionButton label='완성' disabled={!completeEnabled} onClick={onGoComplete} />
        </div>
      )}
    </section>
  );
}
