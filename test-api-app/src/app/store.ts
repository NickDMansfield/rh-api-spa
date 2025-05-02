import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import factReducer from '../features/catFacts/factSlice';

export const store = configureStore({
  reducer: {
    fact: factReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
