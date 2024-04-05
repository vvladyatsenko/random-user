import { configureStore } from '@reduxjs/toolkit';
import randomUserReducer from './Slice/randomUserSlice';

export const store = configureStore({
  reducer: {
    randomUser: randomUserReducer,
  },
});
