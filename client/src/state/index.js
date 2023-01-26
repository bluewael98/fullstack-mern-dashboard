import { createSlice } from "@reduxjs/toolkit";


// intial state for global slice of the store
const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

// create global slice of store
export const globalSlice = createSlice({
  name: "global",  // name of slice
  initialState,  // initial state of the slice
  reducers: {
    setMode: (state) => {  // action to change the mode
      state.mode = state.mode === 'light' ? "dark" : 'light';  // toggle between light and dark
    }
  }
})

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;