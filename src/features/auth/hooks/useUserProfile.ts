import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api";

export function useUserProfile() {
    return useQuery({
        queryKey: ["user", "profile"],
        queryFn: fetchUserProfile,
    });
}
