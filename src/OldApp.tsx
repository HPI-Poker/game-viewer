import './styles/App.css';
import React, { useState, useEffect } from 'react';
import { setup, requestGamelog, requestPlayerNames, requestSummary, addPlayer } from './api/websockets';
import { BrowserRouter as Router, Route, Routes, Navigate, PathRouteProps, useRoutes, Outlet } from 'react-router-dom';
import PlayerMatrix from './model/PlayerMatrix';
import { SummaryObj } from './model/SummaryObj';
import Tournament from './components/Tournament';
import CreateGamePage from './components/CreateGamePage';
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';
import { AppProvider, useAppContext } from './model/AppContext';
import BotPage from './components/BotPage';
import CreateBotPage from './components/CreateBotPage';
import GamePage from './components/GamePage';

const PrivateRoute = ({
  redirectPath = '/login',
}) => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function OldApp() {
  const [roundLog, setRoundLog] = useState<string[][] | null>(null);
  const [summary, setSummary] = useState<SummaryObj | null>(null);

  const [allPlayers, setAllPlayers] = useState<string[]>([]);
  const [playerMatrix, setPlayerMatrix] = useState<PlayerMatrix | null>(null);

  const onSummaryLoaded = (summary: object | null) => {
    if (summary) {
      const summaryObj = new SummaryObj(summary);
      setSummary(summaryObj);

      setPlayerMatrix((playerMatrix) => {
        const [player1, player2] = summaryObj.playerStats.map((playerStat) => playerStat.name);
        const [money1, money2] = summaryObj.playerStats.map((playerStat) => playerStat.score);
        return playerMatrix?.copyBySettingResult(player1, player2, money1, money2) ?? null;
      });
    }
  };

  const onRoundLogLoaded = (roundLog: string[][] | null, gameTitle: string | null) => {
    if (roundLog) {
      setRoundLog(roundLog);
    }
  };

  const onPlayersLoaded = (players: string[], bots: string[]) => {
    setAllPlayers(players);
    setPlayerMatrix(new PlayerMatrix(players));
  };

  const reset = () => {
    setRoundLog(null);
    setSummary(null);
  };

  const loadGame = (player1: string | null, player2: string | null) => {
    if (player1 && player2) {
      requestGamelog(player1, player2);
      requestSummary(player1, player2);
    } else {
      reset();
    }
  };

  const onPlayerAdded = (player: string) => {
    setAllPlayers((allPlayers) => [...allPlayers, player]);

    setPlayerMatrix((playerMatrix) => playerMatrix?.copyByAddingPlayer(player) ?? null);
    
    /* setPlayer1((currentPlayer1) => {
      if (currentPlayer1 === null) {
        return player;
      } else {
        setPlayer2(player);
        return currentPlayer1;
      }
    }); */
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (allPlayers.includes(file.name)) {
        console.log('Player already exists');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (content) {
          const fileContent = content.toString();
          const player = file.name;

          addPlayer(player, fileContent, 'py');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onWebsocketOpen = () => {
    requestPlayerNames();
  };

  useEffect(() => {
    setup(
      onRoundLogLoaded,
      onSummaryLoaded,
      onPlayersLoaded,
      onPlayerAdded,
      onWebsocketOpen,
    );
  }, []);

  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<SignInPage />} />
            <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/create" element={<CreateGamePage />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/bots/:id" element={<BotPage />} />
            <Route path="/bots/create" element={<CreateBotPage />} />
            <Route path="/tournament" element={<Tournament playerMatrix={playerMatrix} onPlayersSelected={loadGame} />} />
          </Route>
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default OldApp;