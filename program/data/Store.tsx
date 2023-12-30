import { configureStore } from '@reduxjs/toolkit';
import referendumsSlice from './ReferendumSlice';

export const store = configureStore({
  reducer: {
    referendums: referendumsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
