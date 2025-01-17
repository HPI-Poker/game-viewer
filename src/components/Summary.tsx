import React from 'react';
import { SummaryObj } from '../model/SummaryObj';
import '../styles/PlayerStatsTable.css';

import { Line } from 'react-chartjs-2';
import { Chart, ChartData, registerables } from 'chart.js';
import Scrollbars from 'react-custom-scrollbars-2';
Chart.register(...registerables);

const Summary = ({ summary }: { summary: SummaryObj }) => {
    const data: ChartData<"line", number[], string> = {
        labels: summary.bankrolls.map(bankroll => `Round ${bankroll.roundNumber}`),
        datasets: [{
            label: `Bankroll of ${summary.playerStats[0].name}`,
            data: summary.bankrolls.map(bankroll => bankroll.bankroll[0]), // This will take Player_1_bankroll for each round
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132)',
        },
        {
            label: `Bankroll of ${summary.playerStats[1].name}`,
            data: summary.bankrolls.map(bankroll => bankroll.bankroll[1]), // This will take Player_2_bankroll for each round
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192)',
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'black', // change the color of the legend labels to white
                },
            },
            tooltip: {
                titleColor: 'black', // change the color of the tooltip title to white
                bodyColor: 'black', // change the color of the tooltip body to white
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.5)', // change the color of the x-axis grid lines
                },
                ticks: {
                    color: 'black', // change the color of the x-axis ticks to white
                },
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.5)', // change the color of the x-axis grid lines
                },
                ticks: {
                    color: 'black', // change the color of the y-axis ticks to white
                },
            },
        },
    };

    return <Scrollbars style={{ width: '1000px', height: '500px' }}>
        <div className="text-text-color" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <h3 style={{ marginTop: 4, marginBottom: 4, fontWeight: "bold" }}>Summary of {summary.title}</h3>
                <span><b>Winner:</b> {summary.tie ? 'Tie' : summary.winner}</span>
            </div>

            <div className="summary-container">
                <div className="player-stats">
                    <div className="player-stats">
                        <h4 style={{marginBottom: 2}}>Player stats:</h4>

                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    {summary.playerStats.map((player, index) => (
                                        <th key={index}>{player.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>                        
                                <tr>
                                    <td className='stat-name'>Score</td>
                                    {summary.playerStats.map((player, index) => (
                                        <td key={index}>{player.score}</td> // Assuming each player object has a 'score' property
                                    ))}
                                </tr>
                                <tr>
                                    <td className='stat-name' title="Voluntarily put money in pot (pre-flop)">VPIP</td>
                                    {summary.playerStats.map((player, index) => (
                                        <td key={index}>{Math.round(player.VPIP * 100)}%</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className='stat-name' title="Pre Flop Raise Percentage">PFR</td>
                                    {summary.playerStats.map((player, index) => (
                                        <td key={index}>{Math.round(player.PFR * 100)}%</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className='stat-name' title="Illegal Actions">Illegals</td>
                                    {summary.playerStats.map((player, index) => (
                                        <td key={index}>{player.illegals}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className='stat-name' title="Timeout">Timeout</td>
                                    {summary.playerStats.map((player, index) => (
                                        <td key={index}>{player.timeouts}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="Winenr">
                    </div>
                </div>
                <div className="bankroll">
                    <h4>Bankroll over time:</h4>
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    </Scrollbars>;
};

export default Summary;