"use client";

import React, { useState } from "react";

const Grid = ({ puzzle }: { puzzle: string }) => {
  const [state, setState] = useState(
    [...puzzle].map((cell) =>
      cell === "." ? { fixed: false, value: "" } : { fixed: true, value: cell },
    ),
  );

  return (
    <div className="h-64 w-64 bg-black grid-cols-9 grid-rows-9 grid auto-rows-fr auto-cols-fr">
      {state.map(({ fixed, value }, index) => (
        <input
          className="border text-center bg-white text-green-900 disabled:bg-slate-100 disabled:text-black"
          maxLength="1"
          key={index}
          min="1"
          max="9"
          disabled={fixed}
          onChange={(e) =>
            setState(state.with(index, { fixed: false, value: e.target.value }))
          }
          value={value}
        />
      ))}
    </div>
  );
};

export default Grid;
