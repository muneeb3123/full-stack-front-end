import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const SignUpUser = createAsyncThunk('signup/fetch', async (formData) => {
  try {
    const response = await axios.post('https://fast-lane-racers-back-end-1.onrender.com/signup', {
      user: formData,
    });
    localStorage.setItem('token', response.headers.authorization);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.errors[0];
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

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUpUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(SignUpUser.fulfilled, (state, action) => ({
        ...state,
        message: action.payload,
        isLoading: action.payload === null,
      }))
      .addCase(SignUpUser.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export default signupSlice.reducer;
