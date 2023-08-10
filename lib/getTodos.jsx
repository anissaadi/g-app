import { createClient } from "@supabase/supabase-js";

const getTodos = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data } = await supabase.from("todos").select().order("created_at");
  return data;
};

export default getTodos;
