import './styles/App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SummaryObj } from './model/SummaryObj';
import { AppProvider } from './model/AppContext';
import UploadPage from './components/UploadPage';
import PokerTablePage from './components/PokerTablePage';

function App() {
  const [log, setLog] = useState<string[][] | null>(null);
  const [summary, setSummary] = useState<SummaryObj | null>(null);


  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<UploadPage setSummary={setSummary} setLog={setLog} summary={summary} />} />
            <Route path='/game' element={<PokerTablePage summary={summary} />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;