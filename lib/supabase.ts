import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) throw Error("Supabase configs are undefined");

const client = createClient(supabaseUrl, supabaseKey);

export default client
