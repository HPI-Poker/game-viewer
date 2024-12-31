import React, { useState, useEffect } from 'react';
import { PlayerObj } from '../model/PlayerObj';
import SimulationUI, { GameSimulationConfig } from './SimulationUI';
import useInterval from '../hooks/intervalHook';
import PokerTable from './PokerTable';
import { EResult } from '../model/PlayerMatrix';
import { SummaryObj } from '../model/SummaryObj';
import Summary from './Summary';
import RoundList from './RoundList';
import '../styles/SimulatedPokerTable.css';
import Header from './Header';

const getWinnerOrDraw = (resultPlayer1: string, resultPlayer2: string) => {
  const [namePlayer1, chipsStrPlayer1] = resultPlayer1.split(" ");
  const [namePlayer2, chipsStrPlayer2] = resultPlayer2.split(" ");
  const chipsPlayer1 = parseInt(chipsStrPlayer1.slice(1, chipsStrPlayer1.length - 1));
  const chipsPlayer2 = parseInt(chipsStrPlayer2.slice(1, chipsStrPlayer2.length - 1));

  if (chipsPlayer1 > chipsPlayer2) {
    return {
      result: namePlayer1,
      chipsPlayer1,
      chipsPlayer2
    };
  } else if (chipsPlayer1 < chipsPlayer2) {
    return {
      result: namePlayer2,
      chipsPlayer1,
      chipsPlayer2
    }
  } else {
    return {
      result: EResult.draw,
      chipsPlayer1,
      chipsPlayer2
    }
  }
};

const getResult = (resultLine: string, namePlayer1: string, namePlayer2: string) => {
  const resultParts = resultLine.split(", ");
  if (resultParts.length > 0 && resultParts[0] === "Final") {
    const [_, resultPlayer1, resultPlayer2] = resultParts;
    // Make sure that the name player order is used in the returned result
    if (resultPlayer1.startsWith(namePlayer1) && resultPlayer2.startsWith(namePlayer2)) {
      return getWinnerOrDraw(resultPlayer1, resultPlayer2);
    } else if ((resultPlayer2.startsWith(namePlayer1) && resultPlayer1.startsWith(namePlayer2))) {
      return getWinnerOrDraw(resultPlayer2, resultPlayer1);
    } else {
      console.error(`Could not find players: ${namePlayer1}, ${namePlayer2} in ${resultLine}`);
      return {
        result: EResult.error,
        chipsPlayer1: null,
        chipsPlayer2: null,
      };
    }
  } else {
    return {
      result: EResult.error,
      chipsPlayer1: null,
      chipsPlayer2: null,
    };
  }
};

const SimulatedPokerTable = ({ log, summary, close }: {
  log: string[][],
  summary: SummaryObj | null,
  close: () => void,
}) => {
  // Define state for the community cards
  const [config, setConfig] = useState(new GameSimulationConfig());
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const [players, setPlayers] = useState<PlayerObj[]>([]);
  const [roundLogIndices, setRoundLogIndices] = useState([0, 0]);
  const [pot, setPot] = useState(0);
  const [activePlayerIdx, setActivePlayerIdx] = useState(-1);

  const isDone = roundLogIndices[0] === log.length - 1 && roundLogIndices[1] === log[roundLogIndices[0]].length - 1;

  const advance = () => {
    setRoundLogIndices(([roundIdx, logIdx]) => {
      const roundLog = log[roundIdx];

      let newRoundIdx = roundIdx
      let newLogIdx = logIdx + 1;
      if (newLogIdx > roundLog.length - 1) {
        newRoundIdx = roundIdx + 1;
        newLogIdx = 0;
      }

      if (newRoundIdx < log.length) {
        handleLogLine(newRoundIdx, newLogIdx);
        return [newRoundIdx, newLogIdx];
      } else {
        return [roundIdx, logIdx];
      }
    });
  };

  const skipToEnd = () => {
    const lastRoundIdx = log.length - 1;
    const lastLogIdx = log[lastRoundIdx].length - 1;
    if (roundLogIndices[0] !== lastRoundIdx && roundLogIndices[1] !== lastLogIdx) {
      setRoundLogIndices([lastRoundIdx, lastLogIdx]);
      handleLogLine(lastRoundIdx, lastLogIdx);
    } else {
      setRoundLogIndices([0, 0]);
      handleLogLine(0, 0);
    }
  };

  const setRound = (round: number) => {
    if (round !== roundLogIndices[0]) {
      const newIndices = [round, 0];
      setRoundLogIndices(newIndices);
      handleLogLine(round, 0);
    }
  };

  useInterval(
    () => advance(),
    config.isPaused ? null : config.speedMs
  );

  const handleLogLine = (roundIdx: number, logIdx: number) => {
    let newTexts = ["", ""];
    let newPlayers = players;

    if (!summary) {
      console.error("Must load summary before starting game.")
      return;
    }

    const logLine = log[roundIdx][logIdx];
    if (!logLine) {
      console.error("Something went wrong with the indices: ", roundIdx, logIdx);
      return;
    }
    if (logLine.startsWith("Round ")) { // Round #7, A-Team is great (200), B (100)
      const [round, ...playerInits] = logLine.split(", ");
      setActivePlayerIdx(-1);
      setPot(0);
      setCommunityCards([]);

      newPlayers = playerInits.map((player) => {
        // Use regular expressions to split the string into two parts
        const regex = /(.+)\s\(([^)]+)\)/;
        const match = player.match(regex);

        if (match) {
          return new PlayerObj(match[1], parseInt(match[2]), summary?.startingStack);
        } else {
          throw new Error("Finding new players failed");
        }
      });
      newPlayers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (logLine.includes(" posts the blind of ")) { // A posts the blind of 1
      const [playerName, blindStr] = logLine.split(" posts the blind of ");
      newPlayers = newPlayers.map((player) => {
        if (player.name === playerName) {
          const blind = parseInt(blindStr);
          return player.copyAndSetStack(player.stack - blind, blind);
        } else {
          return player;
        }
      });

      setActivePlayerIdx(players.findIndex(player => player.name !== playerName));
    } else if (logLine.includes(" dealt ")) { // A dealt [Qs Ts]
      const [playerName, dealt] = logLine.split(" dealt ");
      const hand = dealt.substring(1, dealt.length - 1).split(" ");
      newPlayers = players.map((player) => {
        if (player.name === playerName) {
          return player.copyWithNewHand(hand);
        } else {
          return player;
        }
      });
    } else if (logLine.endsWith(" calls")) {
      const [playerName] = logLine.split(" calls");

      newPlayers = players.map((player, idx) => {
        if (player.name === playerName) {
          const otherPlayer = players[1 - idx];
          return player.copyAndSetStack(player.stack - (otherPlayer.bet - player.bet), otherPlayer.bet);
        } else {
          return player;
        }
      });

      setActivePlayerIdx(1 - activePlayerIdx);
    } else if (logLine.endsWith(" checks")) { // A checks
      const playerName = logLine.replace(" checks", "");
      if (activePlayerIdx > -1) {
        setActivePlayerIdx(1 - activePlayerIdx);
      }

      newTexts = players.map(player => {
        if (player.name === playerName) {
          return "checking";
        } else {
          return "";
        }
      });
    } else if (logLine.endsWith(" folds")) {
      const playerName = logLine.replace(" folds", "");
      newTexts = players.map(player => {
        if (player.name === playerName) {
          return "folds";
        } else {
          return "";
        }
      });

      newPlayers = players.map(player => {
        if (player.name === playerName) {
          return player.copyWithFolded(true);
        } else {
          return player;
        }
      });
    } else if (logLine.includes(" bets ")) {
      const [playerName, raisedToStr] = logLine.split(" bets ");
      const raisedTo = parseInt(raisedToStr);

      newTexts = players.map(player => {
        if (player.name === playerName) {
          return "betting";
        } else {
          return "";
        }
      });

      newPlayers = players.map(player => {
        if (player.name === playerName) {
          return player.copyAndSetStack(player.stack + player.bet - raisedTo, raisedTo);
        } else {
          return player;
        }
      });
    } else if (logLine.includes(" raises to ")) {
      const [playerName, raisedToStr] = logLine.split(" raises to ");
      const raisedTo = parseInt(raisedToStr);

      newTexts = players.map(player => {
        if (player.name === playerName) {
          return "raise";
        } else {
          return "";
        }
      });

      newPlayers = players.map(player => {
        if (player.name === playerName) {
          return player.copyAndSetStack(player.stack + player.bet - raisedTo, raisedTo);
        } else {
          return player;
        }
      });
    } else if (logLine.includes(" response misformatted:")) {
      const [playerName, response] = logLine.split(" response misformatted:");
      newTexts = players.map(player => {
        if (player.name === playerName) {
          return "Misformatted Response!";
        } else {
          return "";
        }
      });
    } else if (logLine.includes(" attempted illegal ")) {
      const [playerName, action] = logLine.split(" attempted illegal ")
      newTexts = players.map(player => {
        if (player.name === playerName) {
          return `Illegal Action: ${action}`;
        } else {
          return "";
        }
      });
    } else if (logLine.startsWith("Flop ")) { // Flop [8d Qd 7s], A (2), B (2)
      setPot(players.reduce((acc, player) => acc + player.bet, 0));
      newPlayers = players.map(player => player.copyAndSetStack(player.stack));

      const flop = logLine.substring("Flop ".length + 1, "Flop ".length + 9).split(" ");
      setCommunityCards(flop);
    } else if (logLine.startsWith("Turn ")) { // Turn [8d Qd 7s 5c], A (2), B (2)
      setPot(pot + players.reduce((acc, player) => acc + player.bet, 0));
      newPlayers = players.map(player => player.copyAndSetStack(player.stack));

      const turn = logLine.substring("Turn ".length + 1, "Turn ".length + 12).split(" ");
      setCommunityCards(turn);
    } else if (logLine.startsWith("River ")) { // River [8d Qd 7s 5c 6c], A (2), B (2)
      setPot(pot + players.reduce((acc, player) => acc + player.bet, 0));
      newPlayers = players.map(player => player.copyAndSetStack(player.stack));

      const riverString = logLine.split(", ")[0];
      const river = riverString.substring("River ".length + 1, riverString.length - 1).split(" ");
      setCommunityCards(river);
    } else if (logLine.startsWith("Run [")) { // Run [Kc Ac 8s 2s 3d 9h Td 5d 6h Ah 4h 4c], A (2), Philipp (2)
      setPot(pot + players.reduce((acc, player) => acc + player.bet, 0));
      newPlayers = players.map(player => player.copyAndSetStack(player.stack));

      const runString = logLine.split(", ")[0];
      const run = runString.substring("Run ".length + 1, runString.length - 1).split(" ");
      setCommunityCards(run);
    } else if (logLine.includes(" shows ")) { // A shows [Qs Ts]
      const [playerName] = logLine.split(" shows ");
      newTexts = players.map((player, idx) => {
        if (player.name === playerName) {
          return "showing hand";
        } else {
          return "";
        }
      });

      setActivePlayerIdx(players.findIndex(player => player.name === playerName));
    } else if (logLine.includes(" awarded ")) { // A awarded -2
      const [playerName, amount] = logLine.split(" awarded ");
      const playerIdx = players.findIndex(player => player.name === playerName);

      newPlayers = players.map((player, idx) => {
        if (playerIdx === idx) {
          return player.copyAndSetBankroll(player.bankroll + parseInt(amount));
        } else {
          return player;
        }
      });

      if (parseInt(amount) > 0) {
        setActivePlayerIdx(playerIdx);
      }

      setPot(0);
    } else if (logLine === "Run reached") {

    } else if (logLine.includes(" won ")) {

    } else if (logLine.startsWith("Final, ")) { // Final, A (398), Mehdi (402)
      const { result, chipsPlayer1, chipsPlayer2 } = getResult(logLine, players[0].name, players[1].name);
      newPlayers = players.map((player, idx) => {
        player = player.copyWithNewHand([]);

        if (result === EResult.error) {
          return player;
        } else {
          return player.copyAndSetBankroll(idx === 0 ? chipsPlayer1! : chipsPlayer2!);
        }
      });

      newTexts = players.map(player => {
        if (result === EResult.error) {
          return "Something went wrong...";
        }

        return result === EResult.draw
          ? "It's a draw!"
          : (player.name === result
            ? "I won!"
            : "I lost..."
          );
      });

    } else if (logLine !== "" && logLine !== "===") {
      throw new Error("Unknown line: " + logLine);
    }

    setPlayers(newPlayers.map((player, idx) => {
      return player.copyWithText(newTexts[idx]);
    }));
  };

  useEffect(() => {
    handleLogLine(roundLogIndices[0], roundLogIndices[0]);
  }, [])

  return (
    <div className='overflow-hidden'>
      {/* <Header /> */}
      <div className='w-screen h-screen flex flex-col'>
        <div className='mt-5 mb-1'>
          <SimulationUI config={config} setConfig={setConfig} skipToEnd={skipToEnd} backToHome={close} summary={summary} setRound={setRound} />
        </div>
        <div>
          <div>
            {/* <RoundList
            title="Top Rounds"
            summary={summary}
            onlyTopHands={true}
            selectedRound={roundLogIndices[0]}
            setRound={setRound}
          /> */}
          </div>
          {/* <div style={{ flex: '1 1 auto' }}>
          <RoundList
            title="All Rounds"
            summary={summary}
            selectedRound={roundLogIndices[0]}
            setRound={setRound}
          />
        </div> */}
        </div>
        <div className='flex flex-column justify-center align-center h-screen'>
          {!isDone && <PokerTable
            communityCards={communityCards}
            players={players}
            pot={pot}
            round={`Round #${roundLogIndices[0] + 1} (${roundLogIndices[1]})`}
            activePlayerIdx={activePlayerIdx}
          />}

          {isDone && summary && <Summary summary={summary} />}
        </div>
      </div>
    </div>
  );
};

export default SimulatedPokerTable;
