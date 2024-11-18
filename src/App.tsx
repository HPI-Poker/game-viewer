import './styles/App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SummaryObj } from './model/SummaryObj';
import { AppProvider } from './model/AppContext';
import UploadPage from './components/UploadPage';
import GamePage from './components/GamePage';


function App() {
  const [roundLog, setRoundLog] = useState<string[][] | null>(null);
  const [summary, setSummary] = useState<SummaryObj | null>(null);

  const [allPlayers, setAllPlayers] = useState<string[]>([]);

  // TODO: Set these states when user uploads a summary.json file.

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (content) {
          const fileContent = content.toString();

          // TODO: Upload summary.json
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;