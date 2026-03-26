interface IdeaEntryProps {
    idea: string;
    setIdea: (value: string) => void;
    onGenerateFlow: () => void;
    isPending: boolean;
}

export default function IdeaEntry({ idea, setIdea, onGenerateFlow, isPending }: IdeaEntryProps) {
    return (
        <section className='flex min-h-[calc(100vh-100px)] flex-col items-center justify-start pt-14'>
            <h2 className='mb-6 text-center text-[56px] font-semibold tracking-[-0.04em] text-white'>
                어떤 이야기를 만들어볼까요?
            </h2>

            <p className='mb-10 text-center text-[18px] leading-8 text-white/80'>
                제작하고 싶은 영상의 아이디어를 자유롭게 입력해주세요.
                <br />
                Remixlab AI가 스토리보드를 만들어드려요!
            </p>

            <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                disabled={isPending}
                placeholder='예) 마법소녀가 밤거리에서 다친 고양이를 발견하고, 마법으로 치유해주는 이야기'
                className='h-[220px] w-full max-w-[1000px] resize-none rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-8 py-7 text-[18px] text-white outline-none placeholder:text-white/25 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition-opacity disabled:opacity-50'
            />

            <button
                onClick={onGenerateFlow}
                disabled={isPending || !idea.trim()}
                className={`mt-8 flex h-[64px] w-full max-w-[1000px] items-center justify-center rounded-[18px] text-[22px] font-semibold transition-all shadow-[0_0_22px_rgba(55,220,225,0.18)] ${
                    isPending || !idea.trim()
                        ? 'cursor-not-allowed bg-white/10 text-white/30 shadow-none'
                        : 'bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] text-black hover:opacity-90 active:scale-[0.98]'
                }`}
            >
                {isPending ? (
                    <div className='flex items-center gap-3'>
                        <div className='h-5 w-5 animate-spin rounded-full border-3 border-white/20 border-t-white' />
                        <span>AI 플롯 생성 중...</span>
                    </div>
                ) : (
                    <>✦ AI 플로우 생성&nbsp;&nbsp;[1 토큰 사용]</>
                )}
            </button>
        </section>
    );
}