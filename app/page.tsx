import { createClient } from "@supabase/supabase-js";
import Grid from "components/grid_preview";

export default async function Home() {
  const supabaseUrl = process.env.SUPABASE_URL; 
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: sudoku_puzzles, error } = await supabase
    .from("sudoku_puzzles")
    .select("puzzle,id");

  return (
    <main>
      <h1 className="p-4 text-lg flex items-center justify-center">
        Choose a puzzle
      </h1>
      <div className="flex flex-wrap items-center justify-between p-24 gap-4">
        {sudoku_puzzles.map((p) => (
          <div key={p.id}>
            <Grid puzzle={p.puzzle} />
          </div>
        ))}
      </div>
    </main>
  );
}
