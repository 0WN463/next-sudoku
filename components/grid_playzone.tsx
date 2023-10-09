"use client";

import React, { useState } from "react";

type Cell = {
  fixed: boolean;
  value?: number;
};

const Grid = ({ puzzle }: { puzzle: string }) => {
  const [state, setState] = useState<Cell>(
    [...puzzle].map((cell) =>
      cell === "." ? { fixed: false } : { fixed: true, value: parseInt(cell) },
    ),
  );

  const onChange = (e, index: number) => {
    if (e.target.value === "") {
      setState(state.with(index, { fixed: false }));
      return;
    }

    const num = parseInt(e.target.value);
    if (isNaN(num) || num <= 0 || num > 9) {
      e.target.setCustomValidity("number out of range");
      return;
    }

    e.target.setCustomValidity("");
    setState(state.with(index, { fixed: false, value: num }));
  };

  return (
    <div className="h-64 w-64 bg-black grid-cols-9 grid-rows-9 grid auto-rows-fr auto-cols-fr">
      {state.map(({ fixed, value }, index) => (
        <input
          className="border text-center bg-white text-green-900 invalid:text-red-900 disabled:bg-slate-100 disabled:text-black"
          maxLength="1"
          key={index}
          min="1"
          max="9"
          disabled={fixed}
          onChange={(e) => onChange(e, index)}
          value={value ?? ""}
        />
      ))}
    </div>
  );
};

export default Grid;
