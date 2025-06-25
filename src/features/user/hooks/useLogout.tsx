import { useMutation, useQueryClient } from "@tanstack/react-query";
import {logout} from "@/features/auth/api";


export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            // Remove user info from cache (e.g., ["user", "profile"])
            queryClient.removeQueries({ queryKey: ["user", "profile"] });
            // You can also remove ["favorites"], ["visited"], etc. if you want
        }
    });
}