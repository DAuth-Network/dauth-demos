import { configureStore } from '@reduxjs/toolkit'
import verifiedSlice from './verifiedSlice'

export const store = configureStore({
  reducer: {
    verifiedData: verifiedSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch