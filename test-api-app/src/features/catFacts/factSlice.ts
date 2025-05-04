import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCatFacts } from './factAPI';

export interface FactState {
  factList: string[];
  hiddenFacts: string[];
  selectedFact: string | null;
  status: string | null;
  errors: string[];
}

const initialState: FactState = {
  factList: [],
  hiddenFacts: [],
  selectedFact: null,
  status: 'idle',
  errors: []
};

export const getCatFacts = createAsyncThunk<string[], void, { rejectValue: string }>(
  'fact/fetchCatFacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCatFacts(10);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err || 'Unknown error');
    }
  }
);

export const factSlice = createSlice({
  name: 'fact',
  initialState,
  reducers: {
    selectFact: (state, action: PayloadAction<string | null>) => {
      state.selectedFact = action.payload;
    },
    hideFact: (state, action: PayloadAction<string>) => {
      state.hiddenFacts.push(action.payload);
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
      .addCase(getCatFacts.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.errors.push(action.payload);
        } else {
          state.errors.push('Unexpected error occurred');
        }
      });
  },
});

export const { selectFact, hideFact } = factSlice.actions;
export const getSelectedFact = (state: RootState) => state.fact.selectedFact;
export const getHiddenFacts = (state: RootState) => state.fact.hiddenFacts;

export default factSlice.reducer;
