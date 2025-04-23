import { configureStore } from '@reduxjs/toolkit'
import AISlice from "./Slice"

export const store = configureStore({
  reducer: AISlice,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store