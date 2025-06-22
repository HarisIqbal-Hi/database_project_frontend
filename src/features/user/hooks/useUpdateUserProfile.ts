import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../api";

export function useUpdateUserProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (data) => {
            // Update the user profile query with new data, if you cache it
            queryClient.setQueryData(["user", "me"], data);
        },
    });
}
