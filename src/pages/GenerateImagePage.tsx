const imageItems = [
  '길을 걷다가 울음소리를 듣는다.',
  '다친 고양이를 발견한다.',
  '마법으로 고양이를 치료한다.',
  '함께 걷기 시작한다.',
  '고양이가 요정으로 변신한다.',
];

const IMAGE_TAGS = ['애니메이션', '시네마틱', '3D', '어린이', '캐릭터'];

export default function GenerateImagePage() {
  return (
    <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-[20px] font-semibold text-white'>이미지 미리보기</h2>

        <div className='flex flex-wrap gap-2'>
          {IMAGE_TAGS.map((tag, index) => (
            <button
              key={tag}
              className={
                index === 0
                  ? 'rounded-full bg-[linear-gradient(180deg,rgba(0,224,255,0.14),rgba(0,224,255,0.05))] px-3.5 py-1.5 text-[11px] text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.55)_inset,0_0_12px_rgba(34,211,238,0.08)]'
                  : 'rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] px-3.5 py-1.5 text-[11px] text-white/72'
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {imageItems.map((text, index) => (
          <div
            key={index}
            className='relative overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'
          >
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

            <div className='relative flex h-[180px] items-center justify-center rounded-[14px] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.10),rgba(255,255,255,0.03)_42%,rgba(0,0,0,0.35)_100%)]'>
              <div className='text-[34px] text-white/18'>🖼️</div>
            </div>

            <p className='relative px-2 py-4 text-center text-[15px] leading-6'>
              <span className='text-cyan-300'>장면 {index + 1}.</span> <span className='text-white/88'>{text}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
