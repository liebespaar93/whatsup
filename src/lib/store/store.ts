import { Store, combineSlices, configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./auth/authSlice";

const rootReducer = combineSlices(authSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itsel
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch']
