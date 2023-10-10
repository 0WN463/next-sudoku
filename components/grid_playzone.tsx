"use client";

import React, { useState } from "react";

type Cell = {
  fixed: boolean;
  value?: number;
};

const to2D = <T,>(arr: T[]) =>
  [...Array(9).keys()].map((i) => arr.slice(i * 9, (i + 1) * 9));

const div = (a: number, b: number) => Math.floor(a / b);

const Grid = ({ puzzle }: { puzzle: string }) => {
  const [state, setState] = useState<Cell[]>(
    [...puzzle].map((cell) =>
      cell === "." ? { fixed: false } : { fixed: true, value: parseInt(cell) },
    ),
  );

  const grid = to2D(state);

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

    setState(state.with(index, { fixed: false, value: num }));

    for (let i = 0; i < 9; i++) {
      if (grid[div(index, 9)][i].value === num) {
        e.target.setCustomValidity("conflict");
        return;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (grid[i][index % 9].value === num) {
        e.target.setCustomValidity("conflict");
        return;
      }
    }

    const subgridRow = div(div(index, 9), 3) * 3;
    const subgridCol = div(index % 9, 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[subgridRow + i][subgridCol + j].value === num) {
          e.target.setCustomValidity("conflict");
          return;
        }
      }
    }

    e.target.setCustomValidity("");
  };

  return (
    <div className="h-64 w-64 bg-black grid-cols-9 grid-rows-9 grid auto-rows-fr auto-cols-fr">
      {state.map(({ fixed, value }, index) => (
        <input
          type="number"
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
