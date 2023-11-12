import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getFoodlist = createAsyncThunk(
  "getFoodlist",
  async (object, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645"
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const loremSlice = createSlice({
  name: "lorem",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getFoodlist.pending]: (state, action) => {
      state.loading = true;
    },
    [getFoodlist.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getFoodlist.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default loremSlice;