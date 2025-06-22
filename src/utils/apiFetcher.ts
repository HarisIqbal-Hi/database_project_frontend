// src/utils/apiFetcher.ts

export class ApiError extends Error {
    status: number;
    info?: any;
    constructor(message: string, status: number, info?: any) {
        super(message);
        this.status = status;
        this.info = info;
    }
}

// Call this to refresh tokens
async function refreshToken() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new ApiError('Refresh failed', res.status, await res.json());
    return res.json();
}

export const apiFetcher = async <T = any>(
    endpoint: string,
    options?: RequestInit,
    _retry = false // prevent infinite loops
): Promise<T> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const url = endpoint.startsWith('http') ? endpoint : baseUrl + endpoint;

    console.log(url, options);

    const res = await fetch(url, {
        credentials: 'include',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
        },
    });

    const contentType = res.headers.get('content-type');
    let data: any = null;
    if (contentType && contentType.includes('application/json')) {
        data = await res.json();
    } else {
        data = await res.text();
    }

    if (!res.ok) {
        // If unauthorized, try refresh and retry original call ONCE
        if (res.status === 401 && !_retry) {
            try {
                await refreshToken();
                // Try original request again (with _retry = true)
                return apiFetcher<T>(endpoint, options, true);
            } catch (e) {
                throw new ApiError('Unauthorized: Refresh failed', res.status, data);
            }
        }
        const errorMessage =
            typeof data === "object" && data?.error
                ? data.error
                : res.statusText;
        throw new ApiError(errorMessage, res.status, data);
    }

    return data as T;
};
