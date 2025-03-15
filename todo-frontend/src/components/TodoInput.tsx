import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddTodo } from "@/hooks/useTodos"; // Assuming these hooks are available
import { useState } from "react";
import { Controller, useForm } from "react-hook-form"; // Import useForm and Controller from react-hook-form

const TodoInput = () => {
  const { control, handleSubmit, reset } = useForm<{
    todoTitle: string;
  }>(); // Initialize react-hook-form
  const [error, setError] = useState<string | null>(null);

  // Custom hooks for adding and updating todos
  const { mutate: addTodoMutation } = useAddTodo();

  const onSubmit = async (data: { todoTitle: string }) => {
    const { todoTitle } = data;

    if (!todoTitle.trim()) {
      setError("Todo title cannot be empty!");
      return;
    }

    try {
      // Add new todo
      addTodoMutation({ title: todoTitle });
      reset(); // Reset the form after successful submission
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
        <Button type="submit">Add Todo</Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default TodoInput;
