import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import InternetConnectionProvider from "./provider/InternetConnectionProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InternetConnectionProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
      </InternetConnectionProvider>
    </Provider>
  </QueryClientProvider>
);
