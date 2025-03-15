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
