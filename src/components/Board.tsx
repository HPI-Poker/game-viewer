import React from 'react';
import Card from './Card';

function Board({ cards, x, y }: { cards: string[], x: number, y: number }) {
  const splits = splitArrayIntoChunks(cards, 11, 7);

  return <g> 
    {splits.map((cardsRow, rowIdx) => <g key={rowIdx} transform={`translate(${x - 85*cardsRow.length/2}, ${y + 121*rowIdx})`}>
      {cardsRow.map((card, idx) => <Card key={idx} card={card} idx={idx} x={0} y={0} />)}
    </g>)}
  </g>;
}

function splitArrayIntoChunks(arr: any[], firstChunkSize: number, chunkSizeRest: number) {
  const chunkedArray = [];
  // First row is special since there is more space
  chunkedArray.push(arr.slice(0,  firstChunkSize));
  
  for (let i = firstChunkSize; i < arr.length; i += chunkSizeRest) {
    chunkedArray.push(arr.slice(i, i + chunkSizeRest));
  }
  return chunkedArray;
}

export default Board;