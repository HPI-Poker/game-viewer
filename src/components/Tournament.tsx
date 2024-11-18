import React from 'react';
import PlayerMatrix from '../model/PlayerMatrix';
import MatchupTable from './MatchupTable';
import Leaderboard from './Leaderboard';
import { requestSummary } from '../api/websockets';
import { useNavigate } from 'react-router-dom';


function Tournament({ playerMatrix, onPlayersSelected }: { playerMatrix: PlayerMatrix | null, onPlayersSelected: (player1: string | null, player2: string | null) => void }) {
    // Add tournament visible button
    let navigate = useNavigate();

    return <div>
        <button onClick={() => navigate('/')}>Back to Home</button>
        {playerMatrix !== null
            ? <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}>
                <div>
                    <MatchupTable
                        playerMatrix={playerMatrix}
                        setSelectedPlayers={onPlayersSelected}
                        loadGameResult={requestSummary}
                    />
                </div>
                <div>
                    <Leaderboard playerMatrix={playerMatrix} />
                </div>
            </div>
            : <p>Loading...</p>
        }
    </div>;
}

export default Tournament;