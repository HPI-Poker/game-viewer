import React, { useEffect, useState } from 'react';
import { UploadPageProps } from "./UploadPage";
import './TournamentPage.css';
import { SummaryObj } from '../model/SummaryObj';
import first_round_1 from '../data/tournament/summary/SUM_first_round_20250117050118_le_boss_vs_quarter_eyed_bandit.json';
import first_round_2 from '../data/tournament/summary/SUM_first_round_20250117050125_haben_wir_noch_chips_vs_free_fridaybeers.json';
import first_round_3 from '../data/tournament/summary/SUM_first_round_20250117050151_blind_bandit_deluxe_vs_random_bets.json';
import first_round_4 from '../data/tournament/summary/SUM_first_round_20250117050156_slotty_vs_graph_von_monte_carlo.json';
import first_round_5 from '../data/tournament/summary/SUM_first_round_20250117050232_tableflip_vs_harry.json';
import first_round_6 from '../data/tournament/summary/SUM_first_round_20250117050328_tjongen_vs_cryptic_chameleon.json';
import first_round_7 from '../data/tournament/summary/SUM_first_round_20250117050336_steady_eddy_vs_came_for_the_pizza.json';
import first_round_8 from '../data/tournament/summary/SUM_first_round_20250117050422_fishmonger_vs_stockfish_v2.json';
import quarter_1 from '../data/tournament/summary/SUM_quarter_finals_20250117052157_quarter_eyed_bandit_vs_haben_wir_noch_chips.json';
import quarter_2 from '../data/tournament/summary/SUM_quarter_finals_20250117052202_blind_bandit_deluxe_vs_graph_von_monte_carlo.json';
import quarter_3 from '../data/tournament/summary/SUM_quarter_finals_20250117052207_harry_vs_cryptic_chameleon.json';
import quarter_4 from '../data/tournament/summary/SUM_quarter_finals_20250117052215_steady_eddy_vs_stockfish_v2.json';
import semi_1 from '../data/tournament/summary/SUM_semi_finals_20250117095451_quarter_eyed_bandit_vs_graph_von_monte_carlo.json';
import semi_2 from '../data/tournament/summary/SUM_semi_finals_20250117095518_harry_vs_stockfish_v2.json';
import final from '../data/tournament/summary/SUM_finals_20250117053820_graph_von_monte_carlo_vs_harry.json';
import game_for_third from '../data/tournament/summary/SUM_third_place_20250117053737_quarter_eyed_bandit_vs_stockfish_v2.json';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TournamentPage = ({ setSummary, setLog, summary }: UploadPageProps) => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Map<number, Map<string, any>>>(new Map());

  const teamNames = [
    "le boss",
    "quarter eyed bandit",
    "haben wir noch chips",
    "free fridaybeers",
    "blind bandit deluxe",
    "random bets",
    "slotty",
    "graph von monte carlo",
    "tableflip",
    "harry",
    "tjongen",
    "cryptic chameleon",
    "steady eddy",
    "came for the pizza",
    "fishmonger",
    "stockfish v2",

    "quarter eyed bandit",
    "haben wir noch chips",
    "blind bandit deluxe",
    "graph von monte carlo",
    "harry",
    "cryptic chameleon",
    "steady eddy",
    "stockfish v2",
    
    "quarter eyed bandit",
    "graph von monte carlo",
    "harry",
    "stockfish v2",

    "graph von monte carlo",
    "harry",

    "graph von monte carlo",
    "stockfish v2",
  ];
  console.log(teamNames.length)

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
    // for (let i = 0; i < 16; ++i) {
      // fetch(`/data/tournament/round_${i}.json`)
      // .then(response => {
      //   return response.json()
      // })
      // .then(data => {
      //   matches.set(i, data);
      //   setMatches(matches);
      // });
    // matches.set(i, example_round1 as any);

    matches.set(0, first_round_1 as any);
    matches.set(1, first_round_2 as any);
    matches.set(2, first_round_3 as any);
    matches.set(3, first_round_4 as any);
    matches.set(4, first_round_5 as any);
    matches.set(5, first_round_6 as any);
    matches.set(6, first_round_7 as any);
    matches.set(7, first_round_8 as any);
    matches.set(8, quarter_1 as any);
    matches.set(9, quarter_2 as any);
    matches.set(10, quarter_3 as any);
    matches.set(11, quarter_4 as any);
    matches.set(12, semi_1 as any);
    matches.set(13, semi_2 as any);
    matches.set(14, final as any);
    matches.set(15, game_for_third as any);

    const alreadyRevealed = JSON.parse(getLocalStorageItem("revealed", "[]"));
    setHiddenOrName(Array.from({length: teamNames.length}, (v, i) => alreadyRevealed.includes(i) ? teamNames[i] : "Reveal Winner"));
    // }
  }, []);  

  const showRound = (round: number) => {
    const roundOffset = 16;
    if (round - roundOffset < 0) return;
    // 'bg-blue-500 text-white font-bold p-0.75'
    
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

  const determineClass = (round: number) => { 
    const alreadyRevealed = JSON.parse(getLocalStorageItem("revealed", "[]"));
    // console.log(round)
    return (alreadyRevealed.includes(round) || round < 16) ? ' text-black font-bold p-0.75' : ' rounded bg-green-500 text-white font-bold';
  }

  return (
<div className="bg-icon">
<div className='flex justify-end width-100'>
  <button className='bg-blue-500 text-white p-3' onClick={() => resetTournamentView()}>reset tournament view</button>
</div>
<div className="brackets" id="brackets"><div className="group5" id="b0"><div className="r1"><div><div className="bracketbox"><span className="info">1</span><button className={"teama"+determineClass(0)} onClick={() => showRound(0)}><span>{teamNames[0]}</span></button><button className={"teamb"+determineClass(1)} onClick={() => showRound(1)}><span>{teamNames[1]}</span></button></div></div><div><div className="bracketbox"><span className="info">2</span><button className={"teama"+determineClass(2)} onClick={() => showRound(2)}><span>{teamNames[2]}</span></button><button className={"teamb"+determineClass(3)} onClick={() => showRound(3)}><span>{teamNames[3]}</span></button></div></div><div><div className="bracketbox"><span className="info">3</span><button className={"teama"+determineClass(4)} onClick={() => showRound(4)}><span>{teamNames[4]}</span></button><button className={"teamb"+determineClass(5)} onClick={() => showRound(5)}><span>{teamNames[5]}</span></button></div></div><div><div className="bracketbox"><span className="info">4</span><button className={"teama"+determineClass(6)} onClick={() => showRound(6)}><span>{teamNames[6]}</span></button><button className={"teamb"+determineClass(7)} onClick={() => showRound(7)}><span>{teamNames[7]}</span></button></div></div><div><div className="bracketbox"><span className="info">5</span><button className={"teama"+determineClass(8)} onClick={() => showRound(8)}><span>{teamNames[8]}</span></button><button className={"teamb"+determineClass(9)} onClick={() => showRound(9)}><span>{teamNames[9]}</span></button></div></div><div><div className="bracketbox"><span className="info">6</span><button className={"teama"+determineClass(10)} onClick={() => showRound(10)}><span>{teamNames[10]}</span></button><button className={"teamb"+determineClass(11)} onClick={() => showRound(11)}><span>{teamNames[11]}</span></button></div></div><div><div className="bracketbox"><span className="info">7</span><button className={"teama"+determineClass(12)} onClick={() => showRound(12)}><span>{teamNames[12]}</span></button><button className={"teamb"+determineClass(13)} onClick={() => showRound(13)}><span>{teamNames[13]}</span></button></div></div><div><div className="bracketbox"><span className="info">8</span><button className={"teama"+determineClass(14)} onClick={() => showRound(14)}><span>{teamNames[14]}</span></button><button className={"teamb"+determineClass(15)} onClick={() => showRound(15)}><span>{teamNames[15]}</span></button></div></div></div><div className="r2"><div><div className="bracketbox"><span className="info">9</span><button className={"teama"+determineClass(16)} onClick={() => showRound(16)}><span>{hiddenOrName[16]}</span></button><button className={"teamb"+determineClass(17)} onClick={() => showRound(17)}><span>{hiddenOrName[17]}</span></button></div></div><div><div className="bracketbox"><span className="info">10</span><button className={"teama"+determineClass(18)} onClick={() => showRound(18)}><span>{hiddenOrName[18]}</span></button><button className={"teamb"+determineClass(19)} onClick={() => showRound(19)}><span>{hiddenOrName[19]}</span></button></div></div><div><div className="bracketbox"><span className="info">11</span><button className={"teama"+determineClass(20)} onClick={() => showRound(20)}><span>{hiddenOrName[20]}</span></button><button className={"teamb"+determineClass(21)} onClick={() => showRound(21)}><span>{hiddenOrName[21]}</span></button></div></div><div><div className="bracketbox"><span className="info">12</span><button className={"teama"+determineClass(22)} onClick={() => showRound(22)}><span>{hiddenOrName[22]}</span></button><button className={"teamb"+determineClass(23)} onClick={() => showRound(23)}><span>{hiddenOrName[23]}</span></button></div></div></div><div className="r3"><div><div className="bracketbox"><span className="info">13</span><button className={"teama"+determineClass(24)} onClick={() => showRound(24)}><span>{hiddenOrName[24]}</span></button><button className={"teamb"+determineClass(25)} onClick={() => showRound(25)}><span>{hiddenOrName[25]}</span></button></div></div><div><div className="bracketbox"><span className="info">14</span><button className={"teama"+determineClass(26)} onClick={() => showRound(26)}><span>{hiddenOrName[26]}</span></button><button className={"teamb"+determineClass(27)} onClick={() => showRound(27)}><span>{hiddenOrName[27]}</span></button></div></div></div><div className="r4"><div><div className="bracketbox"><span className="info">15</span><button className={"teama"+determineClass(28)} onClick={() => showRound(28)}><span>{hiddenOrName[28]}</span></button><button className={"teamb"+determineClass(29)} onClick={() => showRound(29)}><span>{hiddenOrName[29]}</span></button></div></div></div><div className="r5"><div className="final"><div className="bracketbox"><button className={"teamc"+determineClass(30)} onClick={() => showRound(30)}><span>{hiddenOrName[30]}</span></button><div className='text-black text-left'><br/>Game for 3rd place <br/> <button className={"teamc"+determineClass(31)+"mb-16"} onClick={() => showRound(31)}><span>{hiddenOrName[31]}</span></button></div></div></div></div></div></div>
</div>
);
}

export default TournamentPage;