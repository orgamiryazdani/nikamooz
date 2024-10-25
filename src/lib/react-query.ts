import { MutationCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Problem } from "../types/http-errors.interface";

export const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        onError: (error: unknown) => {
            showNotifications(error as Problem);
        },
    }),

    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            throwOnError: false,
            gcTime: 1000 * 60 * 60 * 24,
        },
    },
});

const showNotifications = (problem: Problem) => {
    if (problem?.errors) {
        Object.entries(problem.errors).forEach(([, values]) =>
            values.forEach((errorMessage) =>
                toast.error(errorMessage)
            )
        );
    } else if (problem?.detail) {
        toast.error(problem.detail);
    }
};