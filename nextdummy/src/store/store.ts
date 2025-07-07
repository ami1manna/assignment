import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../modules/employee/employeeSlice';

// Add reducers here as you create slices
export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});

// Types for use in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 