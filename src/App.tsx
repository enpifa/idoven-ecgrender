import React from 'react';
import './styles/styles.css';
import {FileContext} from './context'
import InformationBox from './components/InformationBox';
import Header from './components/Header'
import FileUpload from './components/FileUpload';
import EcgChart from './components/EcgChart';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

function App() {
  const [data, setData] = React.useState<(number | null)[][]>([]);
  
  return (
    <FileContext.Provider value={{data, setData}}>
      <div className="App">
        <Header />
        <InformationBox />
        <FileUpload />
        <EcgChart />
      </div>
    </FileContext.Provider>
  );
}

export default App;
