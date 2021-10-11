import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import unitsSlice from './reducers/unitsSlice';
import listsSlice from './reducers/listsSlice';
import pagesSlice from './reducers/pagesSlice';
import requisitionsSlice from './reducers/requisitionsSlice';
import battlesSlice from './reducers/battlesSlice';

const reducers = combineReducers({
  units: unitsSlice,
  lists: listsSlice,
  pages: pagesSlice,
  requisitions: requisitionsSlice,
  battles: battlesSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store