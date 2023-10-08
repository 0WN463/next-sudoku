const Grid = ({ puzzle }: { puzzle: string }) => (
  <div className="h-64 w-64 bg-black grid-cols-9 grid-rows-9 grid auto-rows-fr auto-cols-fr> hover:ring-1">
    {[...puzzle].map((i, index) => (
      <div key={index} className="border text-center">
        {i === "." ? " " : i}
      </div>
    ))}
  </div>
);

export default Grid;
