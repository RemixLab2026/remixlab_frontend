import ActionButton from '@/components/create/ActionButton';
import StepNavigation from '@/components/create/StepNavigation';
import type { StoryboardItem } from '@/types/create';

const IMAGE_TAGS = ['애니메이션', '시네마틱', '3D', '어린이', '캐릭터'];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

interface ImagePreviewSectionProps {
  items: StoryboardItem[];
  showStepNav: boolean;
  onGoVideo?: () => void;
  canGoVideo?: boolean;
}

export default function ImagePreviewSection({ items, showStepNav, onGoVideo, canGoVideo }: ImagePreviewSectionProps) {
  return (
    <section className='pb-16 pt-8'>
      {showStepNav && <StepNavigation currentStep='image' />}

      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-[20px] font-semibold text-white'>이미지 미리보기</h2>

        <div className='flex flex-wrap gap-2'>
          {IMAGE_TAGS.map((tag, index) => (
            <button
              key={tag}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-[11px]',
                index === 0
                  ? 'bg-[linear-gradient(180deg,rgba(0,224,255,0.14),rgba(0,224,255,0.05))] text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.55)_inset,0_0_12px_rgba(34,211,238,0.08)]'
                  : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] text-white/72'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {items.map((item) => (
          <div
            key={item.id}
            className='relative overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'
          >
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

            <div className='relative flex h-[180px] items-center justify-center rounded-[14px] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.10),rgba(255,255,255,0.03)_42%,rgba(0,0,0,0.35)_100%)]'>
              <div className={cn('text-[34px]', item.imageGenerated ? 'text-white/22' : 'text-white/10')}>🖼️</div>
            </div>

            <p className='relative px-2 py-4 text-center text-[15px] leading-6'>
              <span className='text-cyan-300'>장면 {item.id}.</span>{' '}
              <span className={item.imageGenerated ? 'text-white/88' : 'text-white/35'}>{item.description}</span>
            </p>
          </div>
        ))}
      </div>

      {typeof canGoVideo === 'boolean' && onGoVideo && (
        <div className='mt-7 flex justify-end'>
          <ActionButton label='영상 생성' disabled={!canGoVideo} onClick={onGoVideo} />
        </div>
      )}
    </section>
  );
}
