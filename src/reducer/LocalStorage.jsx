import { createSlice } from "@reduxjs/toolkit";

export const localStoredDataContext = createSlice({
  name: "localStored",
  initialState: {
    tiles:
      JSON.parse(localStorage.getItem("tiles")) === null
        ? []
        : JSON.parse(localStorage.getItem("tiles")),
  },
  reducers: {
    addToStorage: (state, action) => {
      state.tiles = [...state.tiles, action.payload];
      localStorage.setItem("tiles", JSON.stringify(state.tiles));
    },

    updateStorage: (state, action) => {},

    removeFromStorage: (state, action) => {
      let rest = JSON.parse(localStorage.getItem("tiles")).filter(
        (doc) => doc.id !== action.payload.id
      );

      state.tiles = rest;

      localStorage.setItem("tiles", JSON.stringify(state.tiles));
    },
  },
});

export const localStoredDataActions = localStoredDataContext.actions;
