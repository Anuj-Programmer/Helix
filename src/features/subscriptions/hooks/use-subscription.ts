import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const useSubscription = () => {
    return useQuery({
        queryKey: ["subscription"],
        queryFn: async () => {
            const {data} = await authClient.customer.state();
            return data;
        },
    });
};

export const useHasActiveSubcription = () => {
    const {data: customerState, isLoading, ...rest} = useSubscription();
    const hasActiveSubcription = customerState?.activeSubscriptions && customerState.activeSubscriptions.length > 0;

    return {
        hasActiveSubcription,
        subscription: customerState?.activeSubscriptions?.[0],isLoading,...rest,
    }
}
