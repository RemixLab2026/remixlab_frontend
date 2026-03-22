import type { CreateStep } from '@/types/create';

const STEP_LIST: { key: CreateStep; label: string }[] = [
  { key: 'idea', label: '아이디어' },
  { key: 'storyboard', label: '스토리보드' },
  { key: 'image', label: '이미지' },
  { key: 'video', label: '영상' },
  { key: 'complete', label: '완성' },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function StepNavigation({ currentStep }: { currentStep: CreateStep }) {
  const currentIndex = STEP_LIST.findIndex((step) => step.key === currentStep);

  return (
    <div className='mb-8 grid grid-cols-5 gap-3'>
      {STEP_LIST.map((step, index) => {
        const active = index <= currentIndex;

        return (
          <div key={step.key} className='flex flex-col items-center gap-2'>
            <span className={cn('text-[11px]', active ? 'text-cyan-300' : 'text-white/28')}>{step.label}</span>
            <div className={cn('h-px w-full', active ? 'bg-cyan-400/80' : 'bg-white/12')} />
          </div>
        );
      })}
    </div>
  );
}
