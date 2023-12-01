import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { currentBurgerReducer } from './burger-constructor'
import { userReducer } from "./user";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currentBurger: currentBurgerReducer,
    user: userReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export const useTypedDispatch = useDispatch<typeof store.dispatch>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector