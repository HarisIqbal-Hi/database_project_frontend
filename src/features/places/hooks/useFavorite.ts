import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/apiFetcher";
import {getQueryClients} from "@/utils/get-query-clients";

// Add favorite
export const useAddFavorite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (placeId: number) =>
            apiFetcher(`/api/favorites`, {
                method: "POST",
                body: JSON.stringify({ placeId }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["places"] });
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
};

// Remove favorite
export const useRemoveFavorite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (placeId: number) =>
            apiFetcher(`/api/favorites/${placeId}`, {
                method: "DELETE",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["places"] });
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
};