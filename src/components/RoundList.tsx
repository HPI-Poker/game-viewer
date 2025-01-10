import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SummaryObj } from '../model/SummaryObj';

function RoundList({ summary, selectedRound, setRound, onlyTopHands = false, height = '300px' }: { summary: SummaryObj | null, selectedRound: number, onlyTopHands?: boolean, setRound: (i: number) => void, height?: string }) {
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
            listItems.push(
                <div key={i}  className='overflow-auto'>
                    <div className='flex items-center space-x-2 cursor-pointer' onClick={(() => setRound(i+1))}>
                        <div className='text-text-color font-semibold'>Round #{topHand?.roundNumber || i+1} </div>
                        {/* <div className='text-text-color font-semibold'>{wonChips}</div> */}
                    </div>
                   
                </div>
            );
        }
    }

    return (
        <div className='items-center p-2 border-b border-gray-200 overflow-auto h-[30vmin]'>
                {listItems}
        </div>
    )
}

export default RoundList;