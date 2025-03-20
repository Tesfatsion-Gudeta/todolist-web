import { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox"; // Assuming this is the ShadCN Checkbox
import { Trash } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Todo } from "@/types/todo"; // Assuming Todo type is defined in your project
import { useUpdateTodo } from "@/hooks/useTodos";

type Props = {
  todo: Todo; // Use the Todo type here
};

const TodoCard = ({ todo }: Props) => {
  const [isChecked, setIsChecked] = useState(todo.isCompleted || false); // Initialize with isCompleted or false if undefined
  const { mutate: updateTodo } = useUpdateTodo();

  useEffect(() => {
    setIsChecked(todo.isCompleted || false); // Sync with backend
  }, [todo.isCompleted]);

  const handleChecked = async (checked: CheckedState) => {
    const completed = !!checked;
    setIsChecked(completed);

    try {
      // Call the mutation to update the todo completion status
      await updateTodo({
        id: todo._id,
        title: todo.title,
        isCompleted: completed,
      }); // Pass the todo id and title
    } catch (error) {
      console.error("Failed to update todo completion:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Call your delete API function here
      // await deleteTodo(todo._id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="flex justify-between p-2 items-center m-3 rounded overflow-hidden shadow-lg max-w-sm">
      <Checkbox checked={isChecked} onCheckedChange={handleChecked} />
      <p className={`${isChecked ? "line-through text-gray-500" : ""} w-60`}>
        {todo.title}
      </p>

      <Trash className="w-5 h-5 cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default TodoCard;
