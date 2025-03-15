import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/NavBar";
import TodoCard from "@/components/TodoCard";
import { Plus } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";

const Todos = () => {
  const { data } = useTodos();
  const handleAddTodo = () => {};
  return (
    <div className="flex flex-col font-sans">
      <NavBar />
      <div className="p-4">
        <Button className="rounded-xl" onClick={handleAddTodo}>
          <Plus /> Add Task
        </Button>
      </div>
      {data?.map((todo) => (
        <TodoCard key={todo._id} todo={todo.title} />
      ))}
    </div>
  );
};

export default Todos;
