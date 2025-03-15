import TodoCard from "@/components/TodoCard";
import TodoInput from "@/components/TodoInput";
import NavBar from "@/components/ui/NavBar";
import { useTodos } from "@/hooks/useTodos";

const Todos = () => {
  const { data, isLoading, error } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col font-sans">
      <NavBar />
      <TodoInput />

      {data?.map((todo) => (
        <TodoCard key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
