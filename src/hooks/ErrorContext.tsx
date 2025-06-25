"use client"
import React, { createContext, useContext, useState } from "react";
import {setGlobalErrorHandler} from "@/utils/errorBus";

type ApiErrorContextType = {
    error: string | null;
    setError: (error: string | null) => void;
};

const ApiErrorContext = createContext<ApiErrorContextType | undefined>(undefined);

export const ApiErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        console.log("error",error)
        console.log("provider")
        setGlobalErrorHandler(setError);
    }, []);

    return (
        <ApiErrorContext.Provider value={{ error, setError }}>
    {children}
    </ApiErrorContext.Provider>
);
};

export const useApiError = () => {
    const context = useContext(ApiErrorContext);
    if (!context) throw new Error("useApiError must be used within ApiErrorProvider");
    return context;
};