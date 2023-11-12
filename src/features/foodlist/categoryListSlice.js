import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(
  "getCategory",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    try {
      const { data } = await axios.get(
        "https://run.mocky.io/v3/b88ec762-2cb3-4015-8960-2839b06a7593"
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const catSlice = createSlice({
  name: "cat",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getCategory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default catSlice;