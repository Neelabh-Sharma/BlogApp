import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blogslice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  }
});