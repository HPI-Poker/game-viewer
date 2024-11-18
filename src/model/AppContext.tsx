import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Bot } from './Bot';
import { Game } from './Game';

const AppContext = createContext<{
  errors: string[];
  bots: Bot[];
  games: Game[];
  isAuthenticated: boolean;
  login: (userName: string, password: string) => Promise<string | null>;
  logout: () => void;
  setBots: React.Dispatch<React.SetStateAction<Bot[]>>;
  createBot: (name: string, script: string) => void;
  deleteBot: (id: string) => void;
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
} | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bots, setBots] = useState<Bot[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  const login = async (userName: string, password: string): Promise<string | null> => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: userName, password: password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      setIsAuthenticated(true);

      return null;
    } catch (error) {
      console.error('Failed to log in:', error);
      addError('Login failed');
      return 'Incorrect username or password...';
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include',  // include cookies in the request
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to log out:', error);
      addError('Logout failed');
    }
  };

  const addError = useCallback((message: string) => {
    setErrors(prevErrors => [...prevErrors, message]);
    setTimeout(() => {
      setErrors(prevErrors => prevErrors.filter(error => error !== message));
    }, 5000);  // remove the error after 5 seconds
  }, []);

  const fetchBots = useCallback(async () => {
    try {
      const response = await fetch('/bots', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bots');
      }
      const data = await response.json();
      setBots(data);
    } catch (error) {
      console.error('Failed to fetch bots:', error);
      addError('Loading bots failed');
    }
  }, [addError]);

  const createBot = async (name: string, script: string) => {
    try {
      const response = await fetch('/bots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bot_name: name, script: script, file_type: 'py' }),  // adjust this as needed
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to create bot');
      }
      const data = await response.json();
      setBots(prevBots => [...prevBots, data.bot]);
    } catch (error) {
      console.error('Failed to create bot:', error);
      addError('Creating bot failed');
    }
  };

  const deleteBot = async (id: string) => {
    try {
      const response = await fetch(`/bots/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete bot');
      }
      setBots(prevBots => prevBots.filter(bot => bot.id !== id));
    } catch (error) {
      console.error('Failed to delete bot:', error);
      addError('Deleting bot failed');
    }
  };

  useEffect(() => {
    fetchBots();
  }, [fetchBots]);

  return (
    <AppContext.Provider value={{
      errors,
      bots,
      games,
      isAuthenticated,
      login,
      logout,
      setBots,
      createBot,
      deleteBot,
      setGames,
    }}>
      {children}
    </AppContext.Provider>
  );
}