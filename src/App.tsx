import React from 'react';
import './styles/styles.css';
import EcgChartManager from './components/EcgChartManager';
import InformationBox from './components/InformationBox';
import Header from './components/Header'

// TODO
// context
// try big file
// lazy loading
// tests

function App() {
  return (
    <div className="App">
      <Header />
      <InformationBox />
      <EcgChartManager />
    </div>
  );
}

export default App;
