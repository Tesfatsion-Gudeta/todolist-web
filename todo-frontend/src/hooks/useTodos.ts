import { addTodo, deleteTodo, getTodos, updateTodo } from "@/api/todoApi";
import { Todo } from "@/types/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTodos = () => {
  return useQuery({ queryKey: ["todos"], queryFn: getTodos });
};

// export const useAddTodo = () => {
//   const queryClient = useQueryClient();
//   return useMutation(addTodo, {
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
//   });
// };

// Add Todo Mutation
export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, { title: string }>({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error adding todo:", error);
    },
  });
};

//update
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Todo,
    Error,
    { id: string; title: string; isCompleted: boolean },
    { previousTodos: Todo[] | undefined }
  >({
    mutationFn: updateTodo,
    onMutate: async (variables) => {
      // Optimistically update the cache before the mutation is performed
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Get the current todos from the cache
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // Update the todo in the cache optimistically
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.map((todo) =>
          todo._id === variables.id
            ? {
                ...todo,
                title: variables.title,
                isCompleted: variables.isCompleted,
              }
            : todo
        )
      );

      return { previousTodos }; // Return the previous state to rollback in case of error
    },
    onError: (error, variables, context) => {
      // Rollback the optimistic update in case of error
      queryClient.setQueryData(["todos"], context?.previousTodos);
      console.error("Error updating todo: ", error);
    },
    onSettled: () => {
      // Refetch the todos after the mutation is complete
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

//delete todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, { id: string }>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError(error) {
      console.error("Error updating todo: ", error);
    },
  });
};
