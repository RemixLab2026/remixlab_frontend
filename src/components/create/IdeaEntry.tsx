interface IdeaEntryProps {
  idea: string;
  setIdea: (value: string) => void;
  onGenerateFlow: () => void;
}

export default function IdeaEntry({ idea, setIdea, onGenerateFlow }: IdeaEntryProps) {
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
        placeholder='예) 마법소녀가 밤거리에서 다친 고양이를 발견하고, 마법으로 치유해주는 이야기'
        className='h-[220px] w-full max-w-[1000px] resize-none rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-8 py-7 text-[18px] text-white outline-none placeholder:text-white/25 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md'
      />

      <button
        onClick={onGenerateFlow}
        className='mt-8 h-[64px] w-full max-w-[1000px] rounded-[18px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] text-[22px] font-semibold text-black shadow-[0_0_22px_rgba(55,220,225,0.18)] transition hover:opacity-90'
      >
        ✦ AI 플로우 생성&nbsp;&nbsp;[1 토큰 사용]
      </button>
    </section>
  );
}
