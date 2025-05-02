import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCatFacts } from './factAPI';

export interface FactState {
  factList: string[];
  selectedFact: string | null;
  status: string | null;
  errors: string[];
}

const initialState: FactState = {
  factList: [],
  selectedFact: null,
  status: 'idle',
  errors: []
};

export const getCatFacts = createAsyncThunk(
  'fact/fetchCatFacts',
  async () => {
    const response = await fetchCatFacts();
    console.log(response.data)
    return response.data;
  }
);

export const factSlice = createSlice({
  name: 'fact',
  initialState,
  reducers: {
    selectFact: (state, action: PayloadAction<string>) => {
      state.selectedFact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatFacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCatFacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.factList = action.payload;
      })
      .addCase(getCatFacts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { selectFact } = factSlice.actions;
export const getSelectedFact = (state: RootState) => state.fact.selectedFact;

export default factSlice.reducer;
