import React from 'react';
import logo from './logo.svg';
import { FactsList } from './features/catFacts/factList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FactsList />
      </header>
    </div>
  );
}

export default App;
