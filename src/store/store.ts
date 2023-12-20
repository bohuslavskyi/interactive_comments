import {configureStore} from '@reduxjs/toolkit'
import {CommentSlice} from "./features/commentsSlice.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

export const store = configureStore({
  reducer: {
    commentsData: CommentSlice.reducer
  }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;