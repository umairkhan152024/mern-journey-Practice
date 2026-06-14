// ============================================
// FILE: src/favoritesSlice.js
// ============================================
// This file defines:
// 1. the shelf — what data looks like
// 2. the rules — what notes (actions) are allowed
// 3. what mum (reducer) does with each note
// ============================================

// createSlice — function from Redux Toolkit
// creates one shelf of data + its rules
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  // name of this shelf
  name: "favorites",

  // =============================================
  // initialState — starting data
  // =============================================
  // when app first loads
  // items is empty — no favorites yet
  // =============================================
  initialState: {
    items: [],
  },

  // =============================================
  // reducers — the rules
  // =============================================
  // these are the ONLY ways to change items
  // each one is like a note mum can read
  // =============================================
  reducers: {
    // =============================================
    // addFavorite
    // =============================================
    // state   → current shelf data { items: [] }
    // action  → the note we sent
    // action.payload → what we put in the note
    //                  the actual doctor object
    // =============================================
    addFavorite: (state, action) => {
      // add the doctor to items array
      state.items.push(action.payload);
    },

    // =============================================
    // removeFavorite
    // =============================================
    // removes doctor from items
    // action.payload = doctor id to remove
    // filter keeps everything EXCEPT that id
    // =============================================
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

// =============================================
// export actions
// =============================================
// these are the notes components can send
// addFavorite and removeFavorite
// =============================================
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// =============================================
// export reducer
// =============================================
// this goes into the store (the fridge)
// =============================================
export default favoritesSlice.reducer;
