// import { createSlice } from "@reduxjs/toolkit";
// import productsData from '../Data/Products.json';

// const productsSlice = createSlice({
//   name: 'products',
//   initialState: productsData,
//   reducers:{

//   }
// });
// export default productsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import productsData from '../Data/Products.json';

const productsSlice = createSlice({
  name: 'products',
  initialState:  productsData.products,
  reducers: {
    // ✅ ADD PRODUCT
    addProduct: (state, action) => {
      state.push(action.payload); // add new product to Redux state
    },
    // ✅ EDIT PRODUCT
    editProduct: (state, action) => {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // update product in Redux state
      }
    }
  }
});

export const { addProduct, editProduct } = productsSlice.actions;
export default productsSlice.reducer;
