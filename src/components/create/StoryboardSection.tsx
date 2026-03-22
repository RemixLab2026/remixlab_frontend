import ActionButton from '@/components/create/ActionButton';
import StepNavigation from '@/components/create/StepNavigation';
import type { StoryboardItem } from '@/types/create';

const STORY_TAGS = ['스릴러', '코미디', '드라마', '애니메이션', '공포'];

interface StoryboardSectionProps {
  items: StoryboardItem[];
  showStepNav: boolean;
  onGenerateImage: (id: number) => void;
  onGoImage?: () => void;
  canGoImage?: boolean;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function StoryboardSection({ items, showStepNav, onGenerateImage, onGoImage }: StoryboardSectionProps) {
  const hasImage = items.some((item) => item.imageGenerated);

  return (
    <section className='pb-16 pt-8'>
      {showStepNav && <StepNavigation currentStep='storyboard' />}

      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-[20px] font-semibold text-white'>스토리보드</h2>

        <div className='flex flex-wrap gap-2'>
          {STORY_TAGS.map((tag, index) => (
            <button
              key={tag}
              className={cn(
                'rounded-full px-3 py-1.5 text-[10px]',
                index === 0
                  ? 'bg-[linear-gradient(180deg,rgba(0,224,255,0.14),rgba(0,224,255,0.05))] text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.55)_inset,0_0_10px_rgba(34,211,238,0.06)]'
                  : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] text-white/68'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-3'>
        {items.map((item) => (
          <div key={item.id} className='flex gap-4'>
            <div className='relative flex h-[92px] w-[136px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#3ee0e6_0%,#25c4cb_58%,#1da8af_100%)] text-white shadow-[0_12px_28px_rgba(24,196,203,0.14)]'>
              <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.20),transparent_34%),linear-gradient(180deg,transparent,rgba(0,0,0,0.08))]' />
              <span className='relative text-[28px] font-semibold leading-none'>{item.id}</span>
              <span className='relative mt-1 text-[12px] text-white/92'>{item.mood}</span>
            </div>

            <div className='relative flex min-h-[92px] flex-1 items-center justify-between overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-6 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
              <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.12),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

              <div className='relative flex min-w-0 flex-1 items-center gap-5'>
                <div className='flex max-w-[320px] flex-wrap gap-1.5'>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full bg-[linear-gradient(180deg,rgba(0,224,255,0.11),rgba(0,224,255,0.04))] px-2.5 py-[3px] text-[10px] text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className='h-[34px] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.10),transparent)]' />

                <p className='text-[14px] text-white/82'>{item.description}</p>
              </div>

              {item.imageGenerated ? (
                <button className='relative ml-4 flex h-[42px] w-[90px] items-center justify-center overflow-hidden rounded-[13px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.045))] !text-[12px] font-light text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'>
                  <span className='absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.05),transparent_40%)]' />
                  <span className='relative flex items-center gap-1.5'>
                    <img src='/success.png' alt='완료' className='h-[14px] w-[14px] object-contain opacity-90' />
                    <span>완료</span>
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => onGenerateImage(item.id)}
                  className='relative ml-4 flex h-[38px] w-[122px] items-center justify-center overflow-hidden rounded-[13px] bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] !text-[12px] font-light text-white shadow-[0_8px_18px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:opacity-90'
                >
                  <span className='absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_38%)]' />
                  <span className='relative'>이미지 생성</span>
                  <span className='relative ml-1.5 flex h-[18px] items-center rounded-full bg-white/10 px-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'>
                    <img src='/token.png' alt='토큰' className='h-[10px] w-[10px] object-contain opacity-90' />
                    <span className='ml-1 text-[8px]'>3</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {onGoImage && (
        <div className='mt-7 flex justify-end'>
          <ActionButton label='이미지 확인' disabled={!hasImage} onClick={onGoImage} />
        </div>
      )}
    </section>
  );
}
