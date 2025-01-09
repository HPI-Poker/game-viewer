import React, { useRef } from 'react';
import src from '../assets/poker-chip.svg';
// import { useGSAP } from '@gsap/react';



function Chips({ chips, x, y, text }: { chips: number, x: number, y: number, text: string }) {
  const chipRef = useRef(null)

  // useGSAP(() => {
  //   if (chipRef.current) {
  //     gsap.to(chipRef.current, { y : -20});
  //   }
  // }, { dependencies: [chips], revertOnUpdate: false });

  
  return <g ref={chipRef}>
    {text && <text x={x} y={y + 10} fontSize="15" fill="white">
      {text}:
    </text>}
    { chips !== 0   
      ? <g className=''>
        <image x={x + 46} y={y - 25} width="60" xlinkHref={src} />
        <text x={x + 75} y={y + 7} fontSize="20" fill="white" xmlSpace="preserve" textAnchor="middle" dominantBaseline="middle">
          {chips}
        </text>
      </g>
      : <g>
        <text x={x + 75} y={y + 7} fontSize="20" textAnchor="middle" dominantBaseline="middle" fill="black">
          {chips}
        </text>
      </g>
    }
  </g>;
}

export default Chips;