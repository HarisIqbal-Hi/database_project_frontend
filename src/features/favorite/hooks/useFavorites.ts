import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "../api";

export function useFavorites() {
    return useQuery({
        queryKey: ["favorites"],
        queryFn: fetchFavorites,
    });
}