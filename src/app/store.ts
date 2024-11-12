import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartSlice from "./features/CartSlice";
import loginSlice from "./features/loginSlice";
import { useDispatch } from 'react-redux';
import globalSlice from './features/globalSlice';
import { productApiSlice } from './services/productApiSlice';
import networkSlice from './features/NetworkSlice';


const persistConfig = {
  key: 'cart',
  storage,
}
 
const persistedCart = persistReducer(persistConfig, cartSlice)

export const store = configureStore({
  reducer: {
    cart:persistedCart ,
    // cart:cartSlice ,
    login:loginSlice,
    global:globalSlice,
    network:networkSlice,
    [productApiSlice.reducerPath]: productApiSlice.reducer
  } , middleware  : getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck:false,
  }).concat([productApiSlice.middleware]),
 


  
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch:()=> AppDispatch = useDispatch

export const persist = persistStore(store)