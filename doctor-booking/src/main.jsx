// ============================================
// FILE: src/main.jsx
// ============================================
// This file wraps the whole app
// with Provider so every component
// can access the Redux store (fridge)
// ============================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Provider — opens the fridge to everyone
import { Provider } from "react-redux";

// our store (fridge) from store.js
import { store } from "./store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* =============================================
        Provider wraps the WHOLE app
        =============================================
        store={store} — every component inside
        can now READ and CHANGE Redux state

        same idea as Context.Provider
        but for the WHOLE app
        ONE provider for ALL data
        ============================================= */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
