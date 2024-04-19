import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('login/fetch', async (formData) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/login', {
      user: formData,
    });
    localStorage.setItem('token', response.headers.authorization);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    } else {
      return null;
    }
  }
});

const initialState = {
  message: '',
  isLoading: false,
  error: null,
};

const loginUserSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        message: action.payload,
        isLoading: action.payload === null,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export default loginUserSlice.reducer;
