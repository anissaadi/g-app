"use client";
import { Box, Button, Input, Modal, Typography } from "@mui/material";
import Card from "@/components/ui/Card";
import getTodos from "@/lib/getTodos";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodos();
      setTodos(data);

      console.log(data);
    };
    fetchData();
  }, [todos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    setNewTodo(newTodo.trim());
    const { data, error } = await supabase.from("todos").insert([
      {
        title: newTodo,
        todo: "test",
      },
    ]);

    if (error) {
      console.error(error);
      setErr(error.message);
    } else {
      setErr("");
    }

    if (data) {
      console.log(data);
    }
    setNewTodo("");
    setOpen(false);
  };

  const handleModify = async (e) => {
    e.preventDefault();
    setNewTodo(newTodo.trim());
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    console.log(currentCard);
    console.log(newTodo);
    const { data, error } = await supabase
      .from("todos")
      .update({
        title: newTodo,
        todo: "clear",
      })
      .eq("id", currentCard);
    if (error) {
      console.error(error);
    }

    console.log("data : ", data);
    setNewTodo("");
  };

  return (
    <div className="h-full w-full relative bg-white">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center text-white"
      >
        <Box className="">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-white font-bold text-2xl"
          >
            <form
              className="flex md:flex-row flex-col items-center bg-slate-700 text-white self-center mt-10 rounded-lg justify-center md:w-1/2 w-full p-7"
              onSubmit={handleModify}
            >
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="md:w-3/4 w-full h-5 p-5 m-10 placeholder:text-gray-400 text-black border-white outline-none"
              />
              <Button
                className="w-50 h-5 p-5 text-white border border-white sm:text-sm text-md"
                variant="outlined"
                type="submit"
              >
                Modify todo
              </Button>
            </form>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>

      <div className="flex flex-col align-center">
        <form
          className="flex md:flex-row flex-col items-center bg-slate-700 text-white self-center mt-10 rounded-lg justify-center md:w-1/2 w-full p-7"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-2xl p-2">Add Todo</h1>

          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="md:w-3/4 w-full h-5 p-5 m-10 placeholder:text-gray-400 text-black border-white outline-none"
          />
          <Button
            className="w-50 h-5 p-5 text-white border border-white sm:text-sm text-md"
            variant="outlined"
            type="submit"
          >
            add todo
          </Button>

          {err ? (
            <div className="text-red-600 font-bold text-center">{err}</div>
          ) : (
            ""
          )}
        </form>

        <div className="h-full grid lg:grid-cols-4 gap-4 p-10 sm:grid-cols-2 grid-cols-1 mx-0 md:grid-cols-2 md:gap-4">
          {todos
            ? todos.map((todo) => (
                <Card
                  key={todo.id}
                  todo={todo}
                  current={currentCard}
                  setCurrent={setCurrentCard}
                  open={open}
                  setOpen={setOpen}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
