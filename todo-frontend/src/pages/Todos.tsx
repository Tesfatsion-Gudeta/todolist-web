import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/NavBar";
import TodoCard from "@/components/TodoCard";
import { Plus } from "lucide-react";

const Todos = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="p-4">
        <Button className="rounded-xl">
          <Plus /> Add Task
        </Button>
      </div>
      <TodoCard />
    </div>
  );
};

export default Todos;
