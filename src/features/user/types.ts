export type Achievement = {
    id: number;
    type: "visited" | "favorite" | "combo";  // you can add more types!
    title: string;
    description: string;
    "value": number,
    "total": number,
    unlocked: boolean;
    progress: number; // e.g., 8
    goal: number;     // e.g., 10 (to unlock)
    unlockedAt?: string; // Date
};