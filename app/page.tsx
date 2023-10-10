import supabase from "lib/supabase";
import Grid from "components/grid_preview";
import Link from "next/link";

export default async function Home() {
  const { data: sudoku_puzzles, error } = await supabase
    .from("sudoku_puzzles")
    .select("puzzle,id");

  return (
    <main className="lg:h-screen">
      <h1 className="p-4 text-lg flex items-center justify-center">
        Choose a puzzle
      </h1>
      <div className="flex flex-wrap items-center justify-center md:justify-start p-24 gap-8">
        {sudoku_puzzles.map((p, index) => (
          <Link
            href={"puzzle/" + p.id}
            key={p.id}
            className="border rounded hover:bg-sky-700"
          >
            <Grid puzzle={p.puzzle} />
            <span className="flex justify-center">Puzzle #{index + 1}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
