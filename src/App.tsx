import React from 'react';
import './App.css';
import Chart from './components/Chart'; 

const App: React.FC = () => {
  return (
    <div className="App">
      <main className="App-main">
        <Chart />
      </main>
    </div>
  );
}

export default App;
