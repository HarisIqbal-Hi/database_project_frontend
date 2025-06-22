import { apiFetcher } from "@/utils/apiFetcher";
import {User} from "@/components/user/types";


export async function updateUserProfile(updates: Partial<User>) {
    return apiFetcher<User>("/api/user/me", {
        method: "PATCH",
        body: JSON.stringify(updates),
    });
}
