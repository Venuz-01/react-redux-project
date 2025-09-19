import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../Features/productsSlice';
import vendorsReducer from '../Features/vendorSlice';

const store = configureStore({
reducer:{
  products: productsReducer ,
  vendors: vendorsReducer

}

});

export default store;