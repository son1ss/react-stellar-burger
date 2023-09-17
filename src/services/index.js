import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { currentBurgerReducer } from './burger-constructor'
import { modalReducer } from "./modal";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currentBurger: currentBurgerReducer,
    modal: modalReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})