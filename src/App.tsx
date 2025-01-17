import './styles/App.css';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { SummaryObj } from './model/SummaryObj';
import { AppProvider } from './model/AppContext';
import UploadPage from './components/UploadPage';
import PokerTablePage from './components/PokerTablePage';
import TournamentPage from './components/TornamentPage';
import NotFoundPage from './components/NotFoundPage';

function App() {

  const [log, setLog] = useState<string[][] | null>(null);
  const [summary, setSummary] = useState<SummaryObj | null>(null);

  const fetchSummary = () => {
    const summaryLocal = localStorage.getItem('summary');
    setSummary(summaryLocal ? new SummaryObj(JSON.parse(summaryLocal)) : null);
  }

  useEffect(() => {
    fetchSummary();
  }, [setSummary])


  return (

    <AppProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<UploadPage setSummary={setSummary} setLog={setLog} summary={summary} />} />
            <Route path='/game' element={<PokerTablePage summary={summary} />} />
            <Route path="/tournament" element={<TournamentPage setSummary={setSummary} setLog={setLog} summary={summary} />}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>

  );
}

export default App;