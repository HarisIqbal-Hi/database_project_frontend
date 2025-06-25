import { apiFetcher } from "@/utils/apiFetcher";
import {Place} from "@/types/Place";

export async function fetchFavorites() {
    // Returns: { favorites: number[] }
    const data = await apiFetcher<{ favorites: Place[] }>("/api/favorites");
    console.log("favorites",data);
    return data.favorites;
}