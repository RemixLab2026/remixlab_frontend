const storyboardItems = [
  {
    id: 1,
    mood: '적막한',
    tags: ['마법소녀 루나', '별빛이 내리는 밤거리'],
    description: '길을 걷다가 울음소리를 듣는다.',
    done: true,
  },
  {
    id: 2,
    mood: '긴장감 있는',
    tags: ['마법소녀 루나', '어두운 골목'],
    description: '다친 고양이를 발견한다.',
    done: false,
  },
  {
    id: 3,
    mood: '따뜻한',
    tags: ['마법소녀 루나, 고양이', '빛나는 마법'],
    description: '마법으로 고양이를 치료한다.',
    done: false,
  },
  {
    id: 4,
    mood: '평화로운',
    tags: ['마법소녀 루나, 고양이', '달빛 아래 공원'],
    description: '함께 걷기 시작한다.',
    done: false,
  },
  {
    id: 5,
    mood: '환상적인',
    tags: ['마법소녀 루나, 변신한 고양이', '마법의 힘 날개다'],
    description: '고양이가 요정으로 변신한다.',
    done: false,
  },
];

const STORY_TAGS = ['스릴러', '코미디', '드라마', '애니메이션', '공포'];

export default function GeneratePlotPage() {
  return (
    <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-[20px] font-semibold text-white'>스토리보드</h2>

        <div className='flex flex-wrap gap-2'>
          {STORY_TAGS.map((tag, index) => (
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

      <div className='space-y-3'>
        {storyboardItems.map((item) => (
          <div key={item.id} className='flex gap-4'>
            {/* left number card */}
            <div className='relative flex h-[96px] w-[140px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#3ee0e6_0%,#25c4cb_58%,#1da8af_100%)] text-white shadow-[0_12px_28px_rgba(24,196,203,0.16)]'>
              <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.22),transparent_34%),linear-gradient(180deg,transparent,rgba(0,0,0,0.08))]' />
              <span className='relative text-[30px] font-semibold leading-none'>{item.id}</span>
              <span className='relative mt-1 text-[13px] text-white/95'>{item.mood}</span>
            </div>

            {/* main card */}
            <div className='relative flex min-h-[96px] flex-1 items-center justify-between overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-6 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
              <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.12),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

              <div className='relative flex min-w-0 flex-1 items-center gap-6'>
                <div className='flex max-w-[330px] flex-wrap gap-2'>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full bg-[linear-gradient(180deg,rgba(0,224,255,0.11),rgba(0,224,255,0.04))] px-2.5 py-[3px] text-[11px] text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className='h-[38px] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.10),transparent)]' />

                <p className='text-[15px] text-white/85'>{item.description}</p>
              </div>

              {item.done ? (
                <button className='relative ml-4 flex h-[48px] w-[90px] items-center justify-center overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.045))] text-[13px] font-medium text-white/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'>
                  <span className='absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.05),transparent_40%)]' />
                  <span className='relative'>⦿ 완료</span>
                </button>
              ) : (
                <button className='relative ml-4 flex h-[42px] w-[128px] items-center justify-center overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] text-[13px] font-medium text-white shadow-[0_10px_22px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:opacity-90'>
                  <span className='absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.20),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_38%)]' />
                  <span className='relative'>이미지 생성</span>
                  <span className='relative ml-2 flex h-[22px] items-center rounded-full bg-white/10 px-2 text-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'>
                    🪙 3
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
