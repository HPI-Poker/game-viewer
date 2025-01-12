import React from 'react';
import { UploadPageProps } from "./UploadPage";
import './TournamentPage.css';

const TournamentPage = ({ setSummary, setLog, summary }: UploadPageProps) => {
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
  ];
  const showRound = (round: number) => {
    console.log(`Clicked on round ${round}`);
    // Add your click handling
  }
  return (
<>
<div className="brackets" id="brackets"><div className="group5" id="b0"><div className="r1"><div><div className="bracketbox"><span className="info">1</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(0)}><span>{teamNames[0]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(1)}><span>{teamNames[1]}</span></button></div></div><div><div className="bracketbox"><span className="info">2</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(2)}><span>{teamNames[2]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(3)}><span>{teamNames[3]}</span></button></div></div><div><div className="bracketbox"><span className="info">3</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(4)}><span>{teamNames[4]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(5)}><span>{teamNames[5]}</span></button></div></div><div><div className="bracketbox"><span className="info">4</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(6)}><span>{teamNames[6]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(7)}><span>{teamNames[7]}</span></button></div></div><div><div className="bracketbox"><span className="info">5</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(8)}><span>{teamNames[8]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(9)}><span>{teamNames[9]}</span></button></div></div><div><div className="bracketbox"><span className="info">6</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(10)}><span>{teamNames[10]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(11)}><span>{teamNames[11]}</span></button></div></div><div><div className="bracketbox"><span className="info">7</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(12)}><span>{teamNames[12]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(13)}><span>{teamNames[13]}</span></button></div></div><div><div className="bracketbox"><span className="info">8</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(14)}><span>{teamNames[14]}</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(15)}><span>{teamNames[15]}</span></button></div></div></div><div className="r2"><div><div className="bracketbox"><span className="info">9</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(16)}><span>Reveal Winner</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(17)}><span>Reveal Winner</span></button></div></div><div><div className="bracketbox"><span className="info">10</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(18)}><span>Reveal Winner</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(19)}><span>Reveal Winner</span></button></div></div><div><div className="bracketbox"><span className="info">11</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(20)}><span>Reveal Winner</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(21)}><span>Reveal Winner</span></button></div></div><div><div className="bracketbox"><span className="info">12</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(22)}><span>Reveal Winner</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(23)}><span>Reveal Winner</span></button></div></div></div><div className="r3"><div><div className="bracketbox"><span className="info">13</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(24)}><span>Reveal Winner</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(25)}><span>Reveal Winner</span></button></div></div><div><div className="bracketbox"><span className="info">14</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(26)}><span>Reveal Winner</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(27)}><span>Reveal Winner</span></button></div></div></div><div className="r4"><div><div className="bracketbox"><span className="info">15</span><button className="teama bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(28)}><span>Reveal Winner</span></button><button className="teamb bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(29)}><span>Reveal Winner</span></button></div></div></div><div className="r5"><div className="final"><div className="bracketbox"><button className="teamc bg-blue-500 text-white font-bold p-0.5" onClick={() => showRound(30)}><span>Reveal Winner</span></button></div></div></div></div></div>
</>);
}

export default TournamentPage;