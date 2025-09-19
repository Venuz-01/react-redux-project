import { createSlice } from "@reduxjs/toolkit";
import productsData from '../Data/Products.json';

const productsSlice = createSlice({
  name: 'products',
  initialState: productsData,
  reducers:{

  }
});
export default productsSlice.reducer;