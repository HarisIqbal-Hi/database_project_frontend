import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/apiFetcher";
import {Achievement} from "@/features/user/types";

export function useAchievements() {
    return useQuery({
        queryKey: ["user", "achievements","visited"],
        queryFn: () =>
            apiFetcher<{ achievements: Achievement[]; stats: any }>("/api/achievements"),
    });
}
