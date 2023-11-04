import supabase from "@lib/supabase";
import Grid from "@components/grid_playzone";
import Link from "next/link";

const Page = async ({ params }: { params: { id: string } }) => {
  const { data, error } = await supabase
    .from("sudoku_puzzles")
    .select("puzzle")
    .eq("id", params.id)
    .single();

  if (error) return <main>Error fetching puzzle</main>;
  if (!data?.puzzle) return <main>Loading...</main>;

  return (
    <main className="h-screen flex justify-center pt-6 flex-col items-center gap-4">
      <Grid puzzle={data.puzzle} />
      <Link href="/">Back to Home</Link>
    </main>
  );
};

export default Page;
