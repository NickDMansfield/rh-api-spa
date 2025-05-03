import React, { useEffect} from 'react';
import logo from './logo.svg';
import { FactsList } from './features/catFacts/factList';
import { FactDetail } from './features/catFacts/factDetail';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { getCatFacts, selectFact } from './features/catFacts/factSlice';

function App() {

  const dispatch = useAppDispatch();
  const facts = useAppSelector((state) => state.fact.factList);
  const selectedFact = useAppSelector((state) => state.fact.selectedFact);
  const isLoading = useAppSelector((state) => state.fact.status);
  const errors = useAppSelector((state) => state.fact.errors);


  useEffect(() => {

    dispatch(getCatFacts());

    const handlePopState = (event: PopStateEvent) => {
      const fact = event.state?.selectedFact || null;
      dispatch(selectFact(fact));
    };
  
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [dispatch]);
  
  
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Cat Facts!
        <img src={'https://cataas.com/cat'} className="App-logo" alt="logo" />
      </header>
      <div style={{ height: '80vh'}}>
          {selectedFact ?
              <FactDetail />
              :
              facts?.length ?
              <FactsList />
              : ''  
          }
      </div>
    </div>
  );
}

export default App;
