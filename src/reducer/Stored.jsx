import { configureStore } from "@reduxjs/toolkit";

import { localStoredDataContext } from "./LocalStorage";

export const stoted = configureStore({
  reducer: localStoredDataContext.reducer,
});
