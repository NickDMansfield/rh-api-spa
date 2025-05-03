import factReducer, {
  FactState,
  selectFact
} from './factSlice';

describe('fact reducer', () => {
  const initialState: FactState = {
    selectedFact: null,
    factList: [],
    status: 'idle',
    errors: []
  };
  it('should handle initial state', () => {
    expect(factReducer(undefined, { type: 'unknown' })).toEqual({
      factList: initialState.factList,
      selectedFact: initialState.selectedFact,
      errors: initialState.errors,
      status: initialState.status
    });
  });

  it('should set a fact when the fact is selected', () => {
    const results = factReducer({...initialState, factList: ['factorino 1', 'facto 2']}, selectFact('factorino 1'));
    expect(results.selectedFact).toEqual('factorino 1');
  });

  it('should clear the selected fact when select is called with a null', () => {
    const testState = {...initialState, factList: ['factorino 1', 'facto 2'], selectedFact: 'facto 2'};
    const results = factReducer(testState, selectFact(null));
    expect(results.selectedFact).toEqual(null);
  });
});
