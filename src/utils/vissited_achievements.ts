export type AchType = {
    level: number;
    key: string;
    title: string;
    description: string;
    icon: string;
    emoji: string;
}

export const VISITED_ACHIEVEMENTS: Array<AchType> = [
    {
        level: 1,
        key: "beginner_explorer",
        title: "Step Taker",
        description: "Visited your first place!",
        icon: "visited_level_1",       // Or use the emoji directly: "🗺️🥾"
        emoji: "🗺️🥾",
    },
    {
        level: 5,
        key: "city_wanderer",
        title: "City Wanderer",
        description: "5 places explored",
        icon: "visited_level_2",
        emoji: "🏙️",
    },
    {
        level: 10,
        key: "culture_seeker",
        title: "Culture Seeker",
        description: "10 places visited",
        icon: "visited_level_3",
        emoji: "🏛️",
    },
    {
        level: 25,
        key: "chemnitz_adventurer",
        title: "Chemnitz Adventurer",
        description: "25 cultural spots visited",
        icon: "visited_level_4",
        emoji: "🧭",
    },
    {
        level: 50,
        key: "urban_trailblazer",
        title: "Urban Trailblazer",
        description: "50 places visited",
        icon: "visited_level_5",
        emoji: "🚶‍♂️",
    },
    {
        level: 100,
        key: "local_expert",
        title: "Local Expert",
        description: "100 places visited",
        icon: "visited_level_6",
        emoji: "🏆",
    },
    {
        level: 200,
        key: "legendary_voyager",
        title: "Legendary Voyager",
        description: "200+ places—map master!",
        icon: "visited_level_7",
        emoji: "🌟",
    },
    {
        level: 300,
        key: "chemnitz_completionist",
        title: "Chemnitz Completionist",
        description: "Visited (almost) all places!",
        icon: "visited_level_8",
        emoji: "🏅",
    }
];

export const COMBO_ACHIEVEMENTS: Array<AchType> = [
    {
        level: 1,
        key: "dual_enthusiast",
        title: "Dual Enthusiast",
        description: "5 places visited & favorited",
        icon: "combo_level_1",
        emoji: "💖",
    },
    {
        level: 15,
        key: "dedicated_explorer",
        title: "Dedicated Explorer",
        description: "15 visited & favorited",
        icon: "combo_level_2",
        emoji: "🧡",
    },
    {
        level: 30,
        key: "cultural_aficionado",
        title: "Cultural Aficionado",
        description: "30+ visited & favorited",
        icon: "combo_level_3",
        emoji: "🏅",
    }
];
