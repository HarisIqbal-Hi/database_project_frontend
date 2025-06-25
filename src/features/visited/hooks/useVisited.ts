import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchVisitedPlaces, addVisitedPlace, removeVisitedPlace } from "../api";

// Fetch all visited places
export const useVisitedPlaces = () => useQuery({
    queryKey: ["visited", "places"],
    queryFn: fetchVisitedPlaces
});

// Add a visited place
export const useAddVisitedPlace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addVisitedPlace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["visited", "places"] });
        }
    });
};

// Remove a visited place
export const useRemoveVisitedPlace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeVisitedPlace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["visited", "places"] });
        }
    });
};
