import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";

function QueryProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider;
