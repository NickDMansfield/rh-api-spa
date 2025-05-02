import factReducer, {
  FactState,
  selectFact
} from './factSlice';

describe('counter reducer', () => {
  const initialState: FactState = {
    selectedFact: null,
    factList: [],
    status: null,
    errors: []
  };
  it('should handle initial state', () => {
    expect(factReducer(undefined, { type: 'unknown' })).toEqual({
      factList: [],
      selectedFact: null,
    });
  });
});
