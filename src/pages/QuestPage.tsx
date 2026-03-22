const quests = [
  {
    title: '첫 번째 이야기',
    description: '첫 스토리를 생성해보세요.',
    reward: 5,
    locked: false,
    highlight: false,
  },
  {
    title: '아이디어 탐험가',
    description: '3개의 프로젝트를 만들어보세요.',
    reward: 10,
    locked: false,
    highlight: false,
  },
  {
    title: '이미지 마법사',
    description: '이미지를 5장 생성해보세요.',
    reward: 15,
    locked: true,
    highlight: '획득: 다음 이미지 생성',
  },
  {
    title: '스타일리스트',
    description: '3가지 스타일의 이미지를 생성해보세요.',
    reward: 10,
    locked: true,
    highlight: false,
  },
  {
    title: '영상 크리에이터',
    description: '첫 영상을 생성해보세요.',
    reward: 20,
    locked: true,
    highlight: '획득: 영상 생성',
  },
  {
    title: '숏폼 마스터',
    description: '영상을 변환하여 숏폼을 만들어보세요.',
    reward: 25,
    locked: true,
    highlight: false,
  },
  {
    title: '굿즈 디자이너',
    description: '콘텐츠로 굿즈를 제작해보세요.',
    reward: 30,
    locked: true,
    highlight: '획득: 굿즈 제작',
  },
  {
    title: '크리에이터 마스터',
    description: '모든 퀘스트를 완료하세요.',
    reward: 50,
    locked: true,
    highlight: false,
  },
];

function QuestLevelBadge({ active }: { active?: boolean }) {
  return (
    <div
      className={`relative flex h-[76px] w-[96px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[14px] ${
        active
          ? 'bg-[linear-gradient(180deg,#41dce3_0%,#25c5cc_58%,#169ea7_100%)] shadow-[0_10px_24px_rgba(24,196,203,0.16)]'
          : 'bg-[linear-gradient(180deg,rgba(11,75,79,0.88),rgba(7,45,49,0.94))]'
      }`}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(180deg,transparent,rgba(0,0,0,0.08))]' />
      <div className='relative text-[22px] text-white/90'>🔒</div>
      <span className='relative mt-1 text-[11px] text-white/90'>Level 1</span>
    </div>
  );
}

function RewardPill({ reward }: { reward: number }) {
  return (
    <div className='flex h-[22px] items-center rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))] px-2.5 text-[10px] text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'>
      🪙 +{reward}
    </div>
  );
}

export default function QuestPage() {
  const currentXp = 70;
  const maxXp = 100;
  const progressPercent = (currentXp / maxXp) * 100;

  return (
    <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
      {/* 상단 레벨 카드 */}
      <div className='relative overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_46%_0%,rgba(35,209,215,0.12),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

        <div className='relative'>
          <p className='text-[11px] text-white/55'>레벨 진행도</p>

          <div className='mt-4 flex items-end justify-between'>
            <h2 className='text-[18px] font-semibold text-cyan-300'>Lavel 1</h2>

            <div className='flex items-center gap-4'>
              <span className='text-[12px] text-white/35'>Level 2까지 30XP 남았어요!</span>
              <span className='text-[14px] font-semibold text-white'>
                {currentXp}/{maxXp} XP
              </span>
            </div>
          </div>

          <div className='mt-4 grid grid-cols-4 gap-1.5'>
            <div className='h-[16px] overflow-hidden rounded-[999px] bg-white/10'>
              <div
                className='h-full rounded-[999px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] shadow-[0_0_18px_rgba(55,220,225,0.18)]'
                style={{ width: `${Math.min(progressPercent * 1.35, 100)}%` }}
              />
            </div>
            <div className='h-[16px] rounded-[999px] bg-white/10' />
            <div className='h-[16px] rounded-[999px] bg-white/10' />
            <div className='h-[16px] rounded-[999px] bg-white/10' />
          </div>
        </div>
      </div>

      <div className='mt-7'>
        <h2 className='mb-4 text-[18px] font-semibold text-white'>퀘스트 보드</h2>

        <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
          {quests.map((quest, index) => (
            <div key={quest.title} className='flex gap-3'>
              <QuestLevelBadge active={index === 0} />

              <div className='relative min-h-[76px] flex-1 overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
                <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.025),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.015)_62%,rgba(0,0,0,0.06)_100%)]' />

                <div className='relative flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <div className='flex items-center gap-2'>
                      <span className='text-[12px] text-white/82'>{quest.locked ? '🔒' : '◌'}</span>
                      <h3 className={`text-[14px] font-medium ${quest.locked ? 'text-white/45' : 'text-white/90'}`}>
                        {quest.title}
                      </h3>
                    </div>

                    <p className={`mt-2 text-[12px] ${quest.locked ? 'text-white/28' : 'text-white/45'}`}>
                      {quest.description}
                    </p>

                    {quest.highlight && <p className='mt-1.5 text-[11px] text-cyan-400/90'>{quest.highlight}</p>}
                  </div>

                  <RewardPill reward={quest.reward} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
