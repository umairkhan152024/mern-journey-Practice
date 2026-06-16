// ============================================
// FILE: src/main.jsx
// ============================================
// We now have TWO providers:
// 1. QueryClientProvider → for React Query
// 2. Provider            → for Redux
//
// Both wrap the whole app
// ============================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Redux Provider and store
import { Provider } from "react-redux";
import { store } from "./store.js";

// React Query
// QueryClient     → the brain of React Query
//                   manages all fetching and caching
// QueryClientProvider → gives every component
//                       access to React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// =============================================
// CREATE QueryClient
// =============================================
// QueryClient is the brain
// it manages:
// → all your queries
// → caching
// → retries
// → background updates
//
// create it OUTSIDE the component
// so it is created only once
// =============================================
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* =============================================
        QueryClientProvider — React Query brain
        wraps the whole app
        client={queryClient} — gives access to
        all React Query features
        ============================================= */}
    <QueryClientProvider client={queryClient}>
      {/* Redux Provider — same as before */}
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
