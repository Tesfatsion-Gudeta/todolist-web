import { Todo } from "@/types/todo";
import axios from "axios";

const API_URL = "";

export const getTodos = async () => {
  //define the type of the data returned
  const { data } = await axios.get<Todo[]>(API_URL);
  return data;
};
export const addTodo = async (title: string) => {
  const { data } = await axios.post<Todo>(API_URL, { title });
  return data;
};
export const updateTodo = async () => {};
export const deleteTodo = async () => {};
