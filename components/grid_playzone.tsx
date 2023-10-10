"use client";

import React, { useState, useRef } from "react";

type Cell = {
  fixed: boolean;
  value?: number;
};

const to2D = <T,>(arr: T[]) =>
  [...Array(9).keys()].map((i) => arr.slice(i * 9, (i + 1) * 9));

const div = (a: number, b: number) => Math.floor(a / b);

const validGrid = (grid: Cell[][]) =>
  [...Array(9 * 9).keys()].map((i) => isValid(grid, i));

const isValid = (grid: Cell[][], index: number) => {
  const num = grid[div(index, 9)][index % 9].value;

  for (let i = 0; i < 9; i++) {
    if (i !== index % 9 && grid[div(index, 9)][i].value === num) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (i !== div(index, 9) && grid[i][index % 9].value === num) {
      return false;
    }
  }

  const subgridRow = div(div(index, 9), 3) * 3;
  const subgridCol = div(index % 9, 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        !(subgridRow + i === div(index, 9) && subgridCol + j === index % 9) &&
        grid[subgridRow + i][subgridCol + j].value === num
      ) {
        return false;
      }
    }
  }

  return true;
};

const Grid = ({ puzzle }: { puzzle: string }) => {
  const inputs = useRef([...Array(9 * 9)].map(() => React.createRef()));
  const [state, setState] = useState<Cell[]>(
    // use 1D array for state since it is easier to clone
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
    const newState = state.with(index, { fixed: false, value: num });
    setState(newState);

    const validity = validGrid(to2D(newState));

    validity.forEach((isValid, i) =>
      inputs.current[i].current.setCustomValidity(isValid ? "" : "conflict"),
    );

    if (validity.every((b) => b) && newState.every((cell) => cell.value)) {
      alert("🎉Puzzle completed!🎉");
    }
  };

  return (
    <div className="h-64 w-64 bg-black grid-cols-9 grid-rows-9 grid auto-rows-fr auto-cols-fr">
      {state.map(({ fixed, value }, index) => (
        <input
          ref={inputs.current[index]}
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
