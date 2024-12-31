import React from 'react';
import src from '../assets/poker-chip.svg';



function Chips({ chips, x, y, text }: { chips: number, x: number, y: number, text: string }) {
  return <g>
    <text x={x} y={y + 10} fontSize="15" fill="white">
      {text}:
    </text>
    { chips !== 0   
      ? <g className=''>
        <image x={x + 60} y={y - 9} width="30" xlinkHref={src} />
        <text x={x + 75} y={y + 7} fontSize="9" color="white" xmlSpace="preserve" textAnchor="middle" dominantBaseline="middle">
          {chips}
        </text>
      </g>
      : <g>
        <text x={x + 75} y={y + 7} fontSize="9" textAnchor="middle" dominantBaseline="middle" fill="black">
          {chips}
        </text>
      </g>
    }
  </g>;
}

export default Chips;