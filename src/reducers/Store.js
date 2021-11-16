import { createStore } from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { persistStore, persistReducer } from 'redux-persist';

import Reducers from './index';

const persistedReducer = persistReducer({
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer','userReducer', 'cadastroReducer'],
  //blacklist: ['']
}, Reducers);

const store = createStore(persistedReducer);

let persistor = persistStore(store)

export { store, persistor };