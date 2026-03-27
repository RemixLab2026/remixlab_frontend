import { useQuestHooks } from '@/hooks/useQuestHooks';
import LevelProgressCard from '@/components/common/LevelProgressCard';

type QuestDetail = {
  name: string;
  description: string;
  reward: number;
  highlight: string | boolean;
};

const QUEST_DETAILS: QuestDetail[] = [
  { name: '첫 스토리 생성', description: '첫 스토리를 생성해보세요.', reward: 5, highlight: false },
  { name: '아이디어 탐험가', description: '3개의 프로젝트를 만들어보세요.', reward: 10, highlight: false },
  { name: '이미지 마법사', description: '이미지를 5장 생성해보세요.', reward: 15, highlight: '획득: 다음 이미지 생성' },
  { name: '스타일리스트', description: '3가지 스타일의 이미지를 생성해보세요.', reward: 10, highlight: false },
  { name: '영상 크리에이터', description: '첫 영상을 생성해보세요.', reward: 20, highlight: '획득: 영상 생성' },
  { name: '숏폼 마스터', description: '영상을 변환하여 숏폼을 만들어보세요.', reward: 25, highlight: false },
  { name: '굿즈 디자이너', description: '콘텐츠로 굿즈를 제작해보세요.', reward: 30, highlight: '획득: 굿즈 제작' },
  { name: '크리에이터 마스터', description: '모든 퀘스트를 완료하세요.', reward: 50, highlight: false },
];

function QuestLevelBadge({ active }: { active?: boolean }) {
  return (
    <div
      className={`relative flex h-[82px] w-full shrink-0 flex-row items-center justify-center gap-2 overflow-hidden rounded-[12px] md:h-full md:w-[120px] md:flex-col md:gap-0 md:rounded-[14px] ${
        active
          ? 'bg-[linear-gradient(180deg,#41dce3_0%,#25c5cc_58%,#169ea7_100%)] shadow-[0_10px_24px_rgba(24,196,203,0.16)]'
          : 'bg-[linear-gradient(180deg,rgba(11,75,79,0.88),rgba(7,45,49,0.94))]'
      }`}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(180deg,transparent,rgba(0,0,0,0.08))]' />
      <div className='relative text-[22px] text-white/90'>
        <img
          src='/lock.png'
          alt='잠금'
          className='h-[24px] w-[24px] object-contain opacity-90 md:h-[28px] md:w-[28px]'
        />
      </div>
      <span className='relative text-[11px] text-white/90 md:mt-1'>Level 1</span>
    </div>
  );
}

function RewardPill({ reward }: { reward: number }) {
  return (
    <div className='flex h-[22px] items-center gap-1.5 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))] px-2.5 text-[10px] text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'>
      <img src='/token.png' alt='토큰' className='h-[10px] w-[10px] object-contain opacity-90' />
      <span className='text-[11px] md:text-sm'>+{reward}</span>
    </div>
  );
}

export default function QuestPage() {
  const { myQuestsQuery } = useQuestHooks();
  const { data: apiQuests = [], isLoading, isError } = myQuestsQuery;

  const quests = QUEST_DETAILS.map((detail) => {
    const isUnlocked = apiQuests.some((apiQuest) => apiQuest.name === detail.name);
    return {
      ...detail,
      title: detail.name,
      locked: !isUnlocked,
    };
  });

  if (isLoading) {
    return (
      <section className='mx-auto flex max-w-[1280px] justify-center px-4 pb-12 pt-24 md:px-8 md:pb-16 md:pt-32'>
        <div className='text-sm text-white/60'>퀘스트 정보를 불러오는 중입니다...</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='mx-auto flex max-w-[1280px] justify-center px-4 pb-12 pt-24 md:px-8 md:pb-16 md:pt-32'>
        <div className='text-sm text-red-400'>퀘스트 정보를 불러오는데 실패했습니다.</div>
      </section>
    );
  }

  return (
    <section className='mx-auto max-w-[1280px] px-4 pb-12 pt-6 md:px-8 md:pb-16 md:pt-10'>
      <LevelProgressCard />

      <div className='mt-6 md:mt-7'>
        <h2 className='mb-4 text-[16px] font-semibold text-white md:text-[18px]'>퀘스트 보드</h2>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-4 md:gap-y-4'>
          {quests.map((quest, index) => (
            <div key={quest.name} className='flex flex-col gap-3 md:flex-row'>
              <QuestLevelBadge active={index === 0} />

              <div className='relative min-h-[96px] flex-1 overflow-hidden rounded-[12px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md md:min-h-[90px] md:rounded-[14px] md:px-5'>
                <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.025),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.015)_62%,rgba(0,0,0,0.06)_100%)]' />

                <div className='relative flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
                  <div className='min-w-0'>
                    <div className='flex items-center gap-2'>
                      <span className='text-[12px] text-white/82'>
                        {quest.locked ? (
                          <img src='/lock.png' alt='잠금' className='h-[14px] w-[14px] object-contain opacity-90' />
                        ) : (
                          <img src='/success.png' alt='완료' className='h-[14px] w-[14px] object-contain opacity-90' />
                        )}
                      </span>

                      <h3
                        className={`text-[13px] font-medium md:text-[14px] ${quest.locked ? 'text-white/45' : 'text-white/90'}`}
                      >
                        {quest.title}
                      </h3>
                    </div>

                    <p
                      className={`mt-2 text-[11px] leading-relaxed md:text-[12px] ${quest.locked ? 'text-white/28' : 'text-white/45'}`}
                    >
                      {quest.description}
                    </p>

                    {quest.highlight && typeof quest.highlight === 'string' && (
                      <p className='mt-1.5 text-[10px] text-cyan-400/90 md:text-[11px]'>{quest.highlight}</p>
                    )}
                  </div>

                  <div className='self-start md:self-auto'>
                    <RewardPill reward={quest.reward} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
