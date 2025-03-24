import { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox"; // Assuming this is the ShadCN Checkbox
import { Trash } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Todo } from "@/types/todo"; // Assuming Todo type is defined in your project
import { useUpdateTodo, useDeleteTodo } from "@/hooks/useTodos"; // Import the useDeleteTodo hook
import { Button } from "./ui/button";

type Props = {
  todo: Todo; // Use the Todo type here
};

const TodoCard = ({ todo }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    todo.isCompleted ?? false
  );
  const [isEditMode, setIsEditMode] = useState(false); // State to toggle between edit mode and display mode
  const [editTitle, setEditTitle] = useState(todo.title); // State to store the title while editing
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodoMutation } = useDeleteTodo(); // Use the delete mutation here

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
      });
    } catch (error) {
      console.error("Failed to update todo completion:", error);
    }
  };

  const handleDelete = () => {
    try {
      // Use the deleteTodo mutation hook to delete the todo
      deleteTodoMutation({ id: todo._id });
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode); // Toggle edit mode
  };

  const handleSaveEdit = async () => {
    if (editTitle.trim()) {
      try {
        // Optimistically update the title in the UI
        setEditTitle(editTitle); // Update the title locally immediately
        setIsEditMode(false); // Exit edit mode after saving

        // Call the mutation to update the todo title
        await updateTodo({
          id: todo._id,
          title: editTitle,
          isCompleted: todo.isCompleted || false,
        });
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    } else {
      console.error("Title cannot be empty");
    }
  };

  return (
    <div className="flex justify-between p-2 items-center m-3 rounded overflow-hidden shadow-lg max-w-sm">
      <Checkbox checked={isChecked} onCheckedChange={handleChecked} />
      {isEditMode ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-60 px-2 py-1 border rounded-md"
          />
          <Button onClick={handleSaveEdit}>Save</Button>
        </div>
      ) : (
        <p
          className={`${
            isChecked ? "line-through text-gray-500" : ""
          } w-60 cursor-pointer`}
          onClick={handleEditToggle} // Toggle edit mode on click
        >
          {todo.title}
        </p>
      )}

      <Trash className="w-5 h-5 cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default TodoCard;
