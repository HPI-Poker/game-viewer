import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

const width = 80;
const margin = 5;

function Card({ card, idx, x, y, isFolded = false }: { card: string, idx: number, x: number, y: number, isFolded?: boolean }) {


  const cardRef = useRef(null)

  const container = useRef(null);

  useGSAP(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { y : -20});
    }
  }, { dependencies: [card], scope: container, revertOnUpdate: true });

  if (card) {
    try {
      const src = require(`/public/assets/cards/${cardToFilename(card)}.svg`);
      return <g ref={container} key={idx} transform={`translate(${x + idx * (width + margin)}, ${y + 20})`}>
        <image width={width} ref={cardRef} xlinkHref={src} filter={isFolded ? "url(#grayscale)" : ""} />
      </g>;
    } catch (err) {
      console.error(err);
    }
  }

  return null;
}

function cardToFilename(card: string) {
  let [id, suite] = card.split('');

  switch (id) {
    case 'T':
      id = '10';
      break;
    case 'J':
      id = '11-JACK';
      break;
    case 'Q':
      id = '12-QUEEN';
      break;
    case 'K':
      id = '13-KING';
      break;
    case 'A':
      id = '1'
      break;
    default:
      break;
  }

  switch (suite) {
    case 'c':
      suite = 'CLUB';
      break;
    case 's':
      suite = 'SPADE';
      break;
    case 'h':
      suite = 'HEART';
      break;
    case 'd':
      suite = 'DIAMOND';
      break;
  }

  return `${suite}-${id}`;
}

export default Card;