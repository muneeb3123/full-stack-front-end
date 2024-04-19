import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const currentUser = createAsyncThunk('current/fetch', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('http://127.0.0.1:3000/current_user', {
      headers: {
        Accept: 'application/json',
        Authorization: token,
      },
    });
    return response.data.user;
  } catch (error) {
    throw error.response.data.message;
  }
});

const initialState = {
  user: null,
  isUser: false,
  isLoading: false,
  error: null,
};

const currentUserSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(currentUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
        isUser: true,
        isLoading: false,
      }))
      .addCase(currentUser.rejected, (state, action) => ({
        ...state,
        user: null,
        isUser: false,
        error: action.error.message,
        isLoading: false,
      }));
  },
});

export default currentUserSlice.reducer;
