import { createSlice } from "@reduxjs/toolkit";
type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 42,
};

export const CounterSlice = createSlice({
  name: "counter", //name of slice
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = CounterSlice.actions;
