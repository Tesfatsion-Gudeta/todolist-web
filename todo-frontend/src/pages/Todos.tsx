import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/NavBar";

const Todos = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex-1"></div>
      <div className="p-4">
        <Button className="rounded-xl">Add Task</Button>
      </div>
    </div>
  );
};

export default Todos;
