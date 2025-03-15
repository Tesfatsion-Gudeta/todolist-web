import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { addTodo, updateTodo } from "@/api/todoApi"; // Assuming you have the updateTodo API function
import { useForm, Controller } from "react-hook-form"; // Import useForm and Controller from react-hook-form

interface TodoInputProps {
  existingTodo?: { _id: string; title: string }; // Optional prop for existing todo, used in update mode
}

const TodoInput = ({ existingTodo }: TodoInputProps) => {
  const { control, handleSubmit, setValue, reset } = useForm<{
    todoTitle: string;
  }>(); // Initialize react-hook-form
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient(); // React Query hook to refetch todos after adding or updating one

  useEffect(() => {
    if (existingTodo) {
      setValue("todoTitle", existingTodo.title); // Set the form value to the existing todo's title
    }
  }, [existingTodo, setValue]);

  const onSubmit = async (data: { todoTitle: string }) => {
    const { todoTitle } = data;

    if (!todoTitle.trim()) {
      setError("Todo title cannot be empty!");
      return;
    }

    try {
      // if (existingTodo) {
      //   // Update existing todo
      //   await updateTodo(existingTodo._id, todoTitle); // Pass ID and title to update the todo
      // } else {
      // Add new todo
      await addTodo(todoTitle); // Call your addTodo function
      // }

      queryClient.invalidateQueries({ queryKey: ["todos"] }); // Refetch todos after adding or updating
      reset();
      setError(null); // Clear the error
    } catch (err) {
      setError("Failed to submit todo. Please try again.");
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
        <Controller
          name="todoTitle"
          control={control}
          defaultValue={existingTodo?.title || ""}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                type="text"
                placeholder="Enter a new todo"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          )}
        />
        <Button type="submit">
          {existingTodo ? "Update Todo" : "Add Todo"}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default TodoInput;
