import React from "react";

function Filters() {
  return <defs>
    <filter id="grayscale">
      <feColorMatrix
        type="matrix"
        values="0.3333 0.3333 0.3333 0 0.2
                0.3333 0.3333 0.3333 0 0.2
                0.3333 0.3333 0.3333 0 0.2
                0      0      0      1 0"
      />
    </filter>
  </defs>;
}

export default Filters;