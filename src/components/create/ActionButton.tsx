function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

interface ActionButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function ActionButton({ label, disabled, onClick }: ActionButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-[42px] min-w-[108px] items-center justify-center gap-2 rounded-[14px] px-4 text-[13px] font-medium transition',
        disabled
          ? 'cursor-not-allowed bg-white/10 text-white/42'
          : 'bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] text-black shadow-[0_0_18px_rgba(55,220,225,0.16)] hover:opacity-90'
      )}
    >
      {label}
      <span className={cn('text-[16px]', disabled ? 'text-white/38' : 'text-black/80')}>→</span>
    </button>
  );
}
