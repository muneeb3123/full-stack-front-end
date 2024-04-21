import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const apiUrl = 'https://fast-lane-racers-back-end-1.onrender.com/reservations';

export const getReservation = createAsyncThunk(
  'reservations/getReservation',
  async (name, thunkAPI) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `${token}`,
    };
    try {
      const res = await axios.get(apiUrl, {
        headers,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to get data');
    }
  },
);

export const addReservation = createAsyncThunk(
  'reservations/addReservation',
  async (payload, thunkAPI) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `${token}`,
    };
    try {
      const res = await axios.post(apiUrl, payload, {
        headers,
      });
      toast.success(res.data.response);
      return res.data.response;
    } catch (error) {
      toast.error(error.response.data);
      return thunkAPI.rejectWithValue('Unable to get data');
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservationList: [],
    addReservationMsg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservation.fulfilled, (state, action) => {
        state.reservationList = action.payload;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.addReservationMsg = action.payload;
      });
  },
});

export default reservationSlice.reducer;
