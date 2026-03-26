import { useAuthStore } from '@/store/authStore';

export default function LevelProgressCard() {
    // AuthStore에서 유저 정보 가져오기
    const { userInfo } = useAuthStore();

    // 유저 정보 (Zustand 데이터 기반, 없을 경우 게스트 처리)
    const user = userInfo || {
        username: '게스트',
        exp: 70,
        level: 1,
        token: 0
    };

    // XP 계산 로직 (테스트를 위해 전체 XP를 100으로 설정)
    // 💡 AuthStore의 더미 데이터가 exp: 350이라면,
    // 게이지가 꽉 차게 되니 테스트 시 스토어의 exp를 70으로 수정해 보세요!
    const maxXp = 1000;
    const remainXp = maxXp - user.exp;

    // 전체 퍼센트 계산 (0 ~ 100 사이로 제한)
    const actualPercentage = Math.min((user.exp / maxXp) * 100, 100);

    // 4개의 분리된 막대에 퍼센트를 분배하는 함수
    const getChunkPercentage = (index: number) => {
        const chunkSize = 25; // 각 칸이 차지하는 비율 (100% / 4칸)
        const chunkStart = index * chunkSize;

        if (actualPercentage >= chunkStart + chunkSize) {
            return 100; // 이미 다 찬 칸
        } else if (actualPercentage > chunkStart) {
            return ((actualPercentage - chunkStart) / chunkSize) * 100; // 차오르고 있는 칸
        } else {
            return 0; // 아직 안 찬 칸
        }
    };

    return (
        <div className='relative overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-8 py-7 shadow-xl border border-white/5 backdrop-blur-md'>
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_46%_0%,rgba(35,209,215,0.12),transparent_24%)]' />

            <div className='relative'>
                <p className='text-[11px] text-white/55 font-medium'>레벨 진행도</p>

                <div className='mt-3 flex items-end justify-between'>
                    {/* 왼쪽: 현재 레벨 */}
                    <h2 className='text-[28px] font-bold text-cyan-400 tracking-tight'>
                        Level {user.level}
                    </h2>

                    {/* 오른쪽: 남은 XP 및 현재/전체 XP */}
                    <div className='flex items-center gap-5 mb-1'>
            <span className='text-[13px] text-white/35 font-medium'>
              Level {user.level + 1}까지 {remainXp > 0 ? remainXp : 0}XP 남았어요!
            </span>
                        <span className='text-[18px] font-bold text-white tracking-wide'>
              {user.exp}/{maxXp} XP
            </span>
                    </div>
                </div>

                {/* 4개의 독립된 막대 */}
                <div className='mt-5 grid grid-cols-4 gap-1.5'>
                    {[0, 1, 2, 3].map((index) => {
                        const fillPercentage = getChunkPercentage(index);

                        return (
                            <div key={index} className='relative h-[16px] overflow-hidden rounded-full bg-white/10'>
                                {fillPercentage > 0 && (
                                    <div
                                        className='h-full rounded-full bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] shadow-[0_0_15px_rgba(55,220,225,0.4)] transition-all duration-1000 ease-out'
                                        style={{ width: `${fillPercentage}%` }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}