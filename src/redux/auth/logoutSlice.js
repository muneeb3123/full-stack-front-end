import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const logOut = createAsyncThunk('logout/fetch', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete('http://127.0.0.1:3000/logout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response.data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

const initialState = {
  message: '',
  error: null,
};

const logOutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logOut.fulfilled, (state, action) => ({
        ...state,
        message: action.payload,
        error: null,
      }))
      .addCase(logOut.rejected, (state, action) => ({
        ...state,
        message: '',
        error: action.error.message,
      }));
  },
});

export default logOutSlice.reducer;
