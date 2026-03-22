export default function QuestPage() {
  const quests = [
    { title: '첫 번째 이야기', reward: 5 },
    { title: '아이디어 탐험가', reward: 10 },
    { title: '이미지 마법사', reward: 15 },
    { title: '영상 크리에이터', reward: 20 },
    { title: '굿즈 디자이너', reward: 30 },
  ];

  return (
    <div className='mx-auto mt-10 max-w-[1200px] px-6'>
      <h2 className='text-xl text-white/70 mb-6'>퀘스트 보드</h2>

      <div className='grid grid-cols-2 gap-6'>
        {quests.map((q, i) => (
          <div key={i} className='flex justify-between bg-white/5 p-5 rounded-xl'>
            <div>
              <p>{q.title}</p>
              <p className='text-sm text-white/50'>퀘스트 설명</p>
            </div>

            <div className='bg-white/10 px-3 py-1 rounded-full'>+{q.reward}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
