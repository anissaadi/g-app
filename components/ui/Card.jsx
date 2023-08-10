"use client";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createClient } from "@supabase/supabase-js";

export default function CardComponent({
  todo,
  current,
  setCurrent,
  open,
  setOpen,
}) {
  if (!todo) return null;
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("hi how are you");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", todo.id);
    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
    }
  };
  return (
    <Card
      sx={{ minWidth: 275 }}
      className=" text-slate-900 md:w-1/6 w-1/2 p-10"
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 18 }}
          gutterBottom
          className="text-slate-900 text-center mb-7"
        >
          {todo.title}
        </Typography>

        <Typography
          sx={{ fontSize: 14 }}
          gutterBottom
          className="text-slate-700"
        >
          {todo.todo}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setCurrent(todo.id);
            setOpen(true);
          }}
        >
          Modify
        </Button>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
