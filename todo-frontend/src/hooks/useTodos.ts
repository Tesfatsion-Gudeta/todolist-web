import { addTodo, getTodos } from "@/api/todoApi";
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
