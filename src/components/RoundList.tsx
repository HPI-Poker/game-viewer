import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SummaryObj } from '../model/SummaryObj';

function RoundList({ summary, selectedRound, setRound, title, onlyTopHands=false, height='300px' }: { summary: SummaryObj | null, selectedRound: number, onlyTopHands?: boolean, setRound: (i: number) => void, title: string, height?: string }) {
    if (!summary) {
        return null;
    }

    const listItems = [];
    for (let i = 0; i < summary.numberOfRounds; i++) {
        const listItemStyle: React.CSSProperties = {
            fontWeight: i === selectedRound ? 'bold' : 'normal',
            cursor: 'pointer',
            textAlign: 'left',
        };

        const topHand = summary.topHands.find((hand) => hand.roundNumber === i + 1);

        if (!onlyTopHands || topHand !== undefined) {
            const wonChips = topHand ? Math.abs(topHand.chipDelta[0]).toString() : undefined;
            // TODO: Show winners, Blood Runs, Hands
            // Add tooltip with wonChips
            listItems.push(
                <div key={i} onClick={() => setRound(i)} style={listItemStyle} title={wonChips ? "Chips won: " + wonChips : undefined}>
                    Round #{i + 1}{topHand !== undefined ? "!" : ""}
                </div>
            );
        }
    }

    return <div style={{display: 'flex', height: '100%', overflowY: 'auto', marginLeft: 20, marginRight: 20, flexDirection: 'column', alignItems: 'flex-start'}}>
        <h3 style={{marginTop: 4, marginBottom: 4}}>{title}</h3>
        <Scrollbars style={{ width: '100%' }}>
            {listItems}
        </Scrollbars>
    </div>;
}

export default RoundList;