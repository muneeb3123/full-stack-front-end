import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const ALL_CARS_API = 'https://fast-lane-racers-back-end-1.onrender.com/cars';

export const deleteCar = createAsyncThunk('car/deleteCar', async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${ALL_CARS_API}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.data;
});

export const fetchAllCars = createAsyncThunk('cars/fetchAllCars', async () => {
  const response = await axios.get(ALL_CARS_API);
  const allCarsArrayResponse = response.data;
  return allCarsArrayResponse;
});

const initialAllCarsState = {
  allCarsArray: [],
  isLoadingAllCarsArray: false,
};

const allCarsSlice = createSlice({
  name: 'carsIndexSlice',
  initialState: initialAllCarsState,
  extraReducers(builder) {
    builder.addCase(deleteCar.fulfilled, (state, action) => ({
      ...state,
      allCarsArray: state.allCarsArray.filter((car) => car.id !== action.payload),
    }));
    builder.addCase(fetchAllCars.pending, (state) => ({
      ...state,
      isLoadingAllCarsArray: true,
    }));
    builder.addCase(fetchAllCars.fulfilled, (state, action) => ({
      ...state,
      isLoadingAllCarsArray: false,
      allCarsArray: action.payload,
    }));
  },
});

export default allCarsSlice.reducer;
