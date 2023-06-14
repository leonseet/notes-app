// "use client"
import { configureStore } from "@reduxjs/toolkit"
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import notesReducer from "./features/notesSlice"

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    // pokemonApi: pokemonApi.reducer,
  },
  //   middleware(getDefaultMiddleware) {
  //     return getDefaultMiddleware().concat(pokemonApi.middleware);
  //   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
