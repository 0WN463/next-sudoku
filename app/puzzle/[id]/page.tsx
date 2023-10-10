import Grid from "components/grid_playzone";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const Page = async ({ params }: { params: { id: string } }) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("sudoku_puzzles")
    .select("puzzle")
    .eq("id", params.id)
    .single();

  return (
    <main className="h-screen flex justify-center pt-6 flex-col items-center gap-4">
      <Grid puzzle={data.puzzle} />
      <Link href="/">Back to Home</Link>
    </main>
  );
};

export default Page;
