import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRandomUser = createAsyncThunk(
  'randomUser/fetchRandomUser',
  async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data.results[0];
  }
);

const randomUserSlice = createSlice({
  name: 'randomUser',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchRandomUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default randomUserSlice.reducer;
