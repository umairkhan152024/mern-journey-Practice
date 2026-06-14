// ============================================
// FILE: src/store.js
// ============================================
// This file creates the FRIDGE
// puts all shelves (slices) inside it
// ============================================

// configureStore — builds the fridge
import { configureStore } from "@reduxjs/toolkit";

// import the shelf we created in File 1
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    // =============================================
    // "favorites" = the key name
    // this is how we access this shelf later
    // state.favorites.items
    //
    // favoritesReducer = the actual shelf logic
    // imported from favoritesSlice.js
    // =============================================
    favorites: favoritesReducer,
  },
});
