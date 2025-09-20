import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendors: JSON.parse(localStorage.getItem("vendors")) || [],
  loggedInVendor: JSON.parse(localStorage.getItem("loggedInVendor")) || null,
};

const vendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    registerVendor: (state, action) => {
      state.vendors.push(action.payload);
      localStorage.setItem("vendors", JSON.stringify(state.vendors));
    },
    loginVendor: (state, action) => {
      const vendor = state.vendors.find(
        (v) =>
          v.email === action.payload.email &&
          v.password === action.payload.password
      );
      if (vendor) {
        state.loggedInVendor = vendor;
        localStorage.setItem("loggedInVendor", JSON.stringify(vendor));
      } else {
        state.loggedInVendor = null;
      }
    },
    logoutVendor: (state) => {
      state.loggedInVendor = null;
      localStorage.removeItem("loggedInVendor");
    },
  },
});

export const { registerVendor, loginVendor, logoutVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
