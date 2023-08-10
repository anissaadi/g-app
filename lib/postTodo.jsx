const postTodo = async ({ title }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data, error } = await supabase.from("todos").insert([
    {
      title: title,
      todo: "test",
    },
  ]);
};
