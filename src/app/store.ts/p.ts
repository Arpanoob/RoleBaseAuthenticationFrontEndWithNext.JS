import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import { combineReducers } from 'redux';
import authReducer from '../../auth/auth-slice';

// Define persist configuration
const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage,
  // You can use autoMergeLevel1 or autoMergeLevel2 based on your needs
  // autoMergeLevel1: Merges top-level keys only
  // autoMergeLevel2: Merges nested keys
  // Note: autoMergeLevel2 can be used to merge nested reducers
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  // Add any middleware or enhancers here
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
