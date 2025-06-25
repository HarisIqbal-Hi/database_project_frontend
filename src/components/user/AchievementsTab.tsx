import AchievementBadge from "./AchievementBadge";
import {useAchievements} from "@/features/user/hooks/useAchievements";
import {AchType, COMBO_ACHIEVEMENTS, VISITED_ACHIEVEMENTS} from "@/utils/vissited_achievements"; // or use emojis/icons


export default function AchievementsTab() {
    const {data, isLoading} = useAchievements();

    if (isLoading) return <p>Loading achievements…</p>;
    const achievements = data?.achievements ?? [];

    console.log("achievements", achievements);
    if (!achievements.length) {
        return (
            <div style={{textAlign: 'center', color: '#b5c6a4', margin: '2em 0'}}>
                <h4 style={{fontSize: "1.13rem", color: "#f8a948"}}>No achievements yet.<br/>Start exploring to unlock
                    your first badge!</h4>
            </div>
        );
    }

    const convertNumberToWord = (num: number) => {
        switch (num) {
            case 2:
                return "second"
            case 3:
                return "third"
            case 4:
                return "fourth"
        }
    }
    function getAchievementInfo(type: string, value: number): AchType {
        const ARR = type === "visited" ? VISITED_ACHIEVEMENTS : COMBO_ACHIEVEMENTS;
        const milestones = ARR.filter(ach => value >= ach.level);
        let info = milestones.length > 0 ? milestones[milestones.length - 1] : {
            level: 0, key: "", title: "", description: "", icon: "", emoji: ""
        };

        // Special dynamic description for early levels (visited)
        if (type === "visited" && value > 1 && value < 5) {
            info = { ...info, description: `Visited your ${convertNumberToWord(value)} places!` };
        }
        return info;
    }

    function getNextLevel(type: string, value: number, fallback: number): number {
        const ARR = type === "visited" ? VISITED_ACHIEVEMENTS : COMBO_ACHIEVEMENTS;
        const next = ARR.find(ach => ach.level > value);
        return next ? next.level : fallback;
    }
    return (
        <div>
            {achievements.map(a => {
                const info = getAchievementInfo(a.type, a.value);
                const nextLevelValue = getNextLevel(a.type, a.value, a.total);

                return (
                    <AchievementBadge
                        key={a.id}
                        icon={info.icon}
                        title={info.title}
                        desc={info.description}
                        value={a.value}
                        progress={a.progress}
                        goal={a.goal}
                        total={nextLevelValue}
                    />
                );
            })}

        </div>
    );
}