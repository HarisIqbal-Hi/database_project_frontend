import {apiFetcher} from "@/utils/apiFetcher";
import {User} from "@/components/user/types";

export async function login({email, password}: { email: string; password: string }) {
    // The backend expects 'username'
    return apiFetcher('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({username: email, password}),
    });
}

// Example register API
export async function register({
                                   userName,
                                   email,
                                   password,
                                   name
                               }: { name: string; email: string; password: string, userName: string }) {
    return apiFetcher('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({username: userName, email, password, full_name: name}),
    });
}

export async function fetchUserProfile(): Promise<{ user: User }> {
    // Adjust the endpoint to match your backend route
    return apiFetcher<{ user: User }>("/api/user/me");
}

export async function logout() {
    return apiFetcher("/api/auth/logout", {
        method: "POST",
    });
}