import { createSlice } from "@reduxjs/toolkit";
import vendorsData from '../Data/vendors.json';

const vendorsSlice = createSlice({
  name: 'vendors',
  initialState: vendorsData,
  reducers:{

  }
});
export default vendorsSlice.reducer;
