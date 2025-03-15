import { Todo } from "@/types/todo";
import axiosInstance from "@/utils/axiosInstance";

const API_URL = "/todos";

export const getTodos = async () => {
  //define the type of the data returned
  const { data } = await axiosInstance.get<Todo[]>(API_URL);
  return data;
};
export const addTodo = async (title: string) => {
  const { data } = await axiosInstance.post<Todo>(API_URL, { title });
  return data;
};
export const updateTodo = async () => {};
export const deleteTodo = async () => {};
