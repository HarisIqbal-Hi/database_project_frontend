'use client';

import {QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import {getQueryClients} from "@/utils/get-query-clients";

export default function QueryProvider({ children }: { children: ReactNode }) {
    const queryClient = getQueryClients()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}