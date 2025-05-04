import factReducer, {
  FactState,
  selectFact,
  getCatFacts,
  hideFact
} from './factSlice';
import { configureStore } from '@reduxjs/toolkit';
import * as api from './factAPI';

describe('fact reducer', () => {
  const initialState: FactState = {
    selectedFact: null,
    factList: [],
    hiddenFacts: [],
    status: 'idle',
    errors: []
  };
  it('should handle initial state', () => {
    expect(factReducer(undefined, { type: 'unknown' })).toEqual({
      factList: initialState.factList,
      selectedFact: initialState.selectedFact,
      hiddenFacts: [],
      errors: initialState.errors,
      status: initialState.status
    });
  });

  // selectFact
  it('should set a fact when the fact is selected', () => {
    const results = factReducer({...initialState, factList: ['factorino 1', 'facto 2']}, selectFact('factorino 1'));
    expect(results.selectedFact).toEqual('factorino 1');
  });

  // clear selected fact
  it('should clear the selected fact when select is called with a null', () => {
    const testState = {...initialState, factList: ['factorino 1', 'facto 2'], selectedFact: 'facto 2'};
    const results = factReducer(testState, selectFact(null));
    expect(results.selectedFact).toEqual(null);
  });

  // getCatFacts
  it('should set the stored facts to the ones returned by the network call', async () => {
    
      // mock
      jest.spyOn(api, 'fetchCatFacts').mockResolvedValueOnce({
        data: ['Mock Fact 1', 'Mock Fact 2'],
      });
      // setup
      const store = configureStore({
        reducer: {
          fact: factReducer,
        },
      });
  
      // execute
      await store.dispatch(getCatFacts());
  
      // validate
      const state = store.getState().fact;
      expect(state.factList).toEqual(['Mock Fact 1', 'Mock Fact 2']);
      expect(state.status).toBe('succeeded');
  });

  // hideFact
  it('should hide the clicked fact', () => {
    const testState = {...initialState, factList: ['factorino 1', 'facto 2'] };
    const resultState = factReducer(testState, hideFact('facto 2'));
    expect(resultState.hiddenFacts).toEqual(['facto 2']);
  });
});
