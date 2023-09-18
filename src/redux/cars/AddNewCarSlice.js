import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for car creation
const initialState = {
  newCar: null,
  status: 'idle',
  error: null,
};

// Define the async thunk for creating a new car
export const createNewCar = createAsyncThunk('cars/createNewCar', async (carData) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/cars', carData);
    return response.data;
  } catch (error) {
    throw error.response.data; // Throw the API error response
  }
});

// Create a cars slice
const createNewCarSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewCar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.newCar = action.payload;
      })
      .addCase(createNewCar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default createNewCarSlice.reducer;
