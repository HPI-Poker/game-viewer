import React, { useEffect, useState } from 'react';
import { UploadPageProps } from "./UploadPage";
import './TournamentPage.css';
import { SummaryObj } from '../model/SummaryObj';
import example_round from "../data/tournament/round_0.json"; 
import example_round1 from "../data/SUM_Precomputer_vs_Mr Carlo.json";
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TournamentPage = ({ setSummary, setLog, summary }: UploadPageProps) => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Map<number, Map<string, any>>>(new Map());

  const teamNames = [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13",
    "Team 14",
    "Team 15",
    "Team 16",
    "Team 1",
    "Team 4",
    "Team 5",
    "Team 8",
    "Team 9",
    "Team 12",
    "Team 13",
    "Team 16",
    "Team 1",
    "Team 8",
    "Team 9",
    "Team 16",
    "Team 1",
    "Team 16",
    "Team 16",
    "Team 8"
  ];

  const getLocalStorageItem = (item: string, defaultValue: string) => {
    const itemString = localStorage.getItem(item);
    if (itemString === null) {
      return defaultValue;
    }
    return itemString;
  }

  const setLocalStorage = (summaryJson: any) => {
    localStorage.setItem("summary", JSON.stringify(summaryJson));
  };

  const [hiddenOrName, setHiddenOrName] = useState<string[]>(Array.from({length: teamNames.length}, () => 'Reveal Winner'));

  useEffect(() => {
    for (let i = 0; i < 16; ++i) {
      // fetch(`/data/tournament/round_${i}.json`)
      // .then(response => {
      //   return response.json()
      // })
      // .then(data => {
      //   matches.set(i, data);
      //   setMatches(matches);
      // });
      matches.set(i, example_round1 as any);
      const alreadyRevealed = JSON.parse(getLocalStorageItem("revealed", "[]"));
      setHiddenOrName(Array.from({length: teamNames.length}, (v, i) => alreadyRevealed.includes(i) ? teamNames[i] : "Reveal Winner"));
    }
  }, []);  

  const showRound = (round: number) => {
    const roundOffset = 16;
    if (round - roundOffset < 0) return;
    
    const alreadyRevealed = JSON.parse(getLocalStorageItem("revealed", "[]"));
    if (!alreadyRevealed.includes(round)) {
      alreadyRevealed.push(round);
      localStorage.setItem("revealed", JSON.stringify(alreadyRevealed));
    }

    round -= roundOffset;
    setSummary(new SummaryObj(matches.get(round)));
    setLocalStorage(matches.get(round));
    navigate("/game");
  }

  const resetTournamentView = () => {
    localStorage.removeItem("revealed");
  }

  return (
<div className="bg-icon">
<div className='flex justify-end width-100'>
  <button className='bg-blue-500 text-white' onClick={() => resetTournamentView()}>reset tournament view</button>
</div>
<div className="brackets" id="brackets"><div className="group5" id="b0"><div className="r1"><div><div className="bracketbox"><span className="info">1</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(0)}><span>{teamNames[0]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(1)}><span>{teamNames[1]}</span></button></div></div><div><div className="bracketbox"><span className="info">2</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(2)}><span>{teamNames[2]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(3)}><span>{teamNames[3]}</span></button></div></div><div><div className="bracketbox"><span className="info">3</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(4)}><span>{teamNames[4]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(5)}><span>{teamNames[5]}</span></button></div></div><div><div className="bracketbox"><span className="info">4</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(6)}><span>{teamNames[6]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(7)}><span>{teamNames[7]}</span></button></div></div><div><div className="bracketbox"><span className="info">5</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(8)}><span>{teamNames[8]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(9)}><span>{teamNames[9]}</span></button></div></div><div><div className="bracketbox"><span className="info">6</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(10)}><span>{teamNames[10]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(11)}><span>{teamNames[11]}</span></button></div></div><div><div className="bracketbox"><span className="info">7</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(12)}><span>{teamNames[12]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(13)}><span>{teamNames[13]}</span></button></div></div><div><div className="bracketbox"><span className="info">8</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(14)}><span>{teamNames[14]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(15)}><span>{teamNames[15]}</span></button></div></div></div><div className="r2"><div><div className="bracketbox"><span className="info">9</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(16)}><span>{hiddenOrName[16]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(17)}><span>{hiddenOrName[17]}</span></button></div></div><div><div className="bracketbox"><span className="info">10</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(18)}><span>{hiddenOrName[18]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(19)}><span>{hiddenOrName[19]}</span></button></div></div><div><div className="bracketbox"><span className="info">11</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(20)}><span>{hiddenOrName[20]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(21)}><span>{hiddenOrName[21]}</span></button></div></div><div><div className="bracketbox"><span className="info">12</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(22)}><span>{hiddenOrName[22]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(23)}><span>{hiddenOrName[23]}</span></button></div></div></div><div className="r3"><div><div className="bracketbox"><span className="info">13</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(24)}><span>{hiddenOrName[24]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(25)}><span>{hiddenOrName[25]}</span></button></div></div><div><div className="bracketbox"><span className="info">14</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(26)}><span>{hiddenOrName[26]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(27)}><span>{hiddenOrName[27]}</span></button></div></div></div><div className="r4"><div><div className="bracketbox"><span className="info">15</span><button className="teama bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(28)}><span>{hiddenOrName[28]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(29)}><span>{hiddenOrName[29]}</span></button></div></div></div><div className="r5"><div className="final"><div className="bracketbox"><button className="teamc bg-blue-500 text-white font-bold p-0.75" onClick={() => showRound(30)}><span>{hiddenOrName[30]}</span></button><button className="teamc bg-blue-500 text-white font-bold p-0.75 mb-32" onClick={() => showRound(31)}><span>{hiddenOrName[31]}</span></button></div></div></div></div></div>
</div>
);
}

export default TournamentPage;