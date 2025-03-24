import { Todo } from "@/types/todo";
import axiosInstance from "@/utils/axiosInstance";

const API_URL = "/todos";

// Get all Todos
export const getTodos = async () => {
  try {
    const { data } = await axiosInstance.get<Todo[]>(API_URL);
    return data;
  } catch (error) {
    console.error("Error fetching todos", error);
    throw new Error("Error fetching todos");
  }
};

// Add a new Todo
export const addTodo = async ({ title }: { title: string }) => {
  try {
    const { data } = await axiosInstance.post<Todo>(API_URL, { title });
    return data;
  } catch (error) {
    console.error("Error creating todo", error);
    throw new Error("Error creating todo");
  }
};

// Update a Todo
export const updateTodo = async ({
  id,
  title,
  isCompleted,
}: {
  id: string;
  title: string;
  isCompleted: boolean;
}) => {
  try {
    const { data } = await axiosInstance.put<Todo>(`${API_URL}/${id}`, {
      title,
      isCompleted,
    });
    return data;
  } catch (error) {
    console.error("Error updating todo", error);
    throw new Error("Error updating todo");
  }
};

// Delete a Todo
export const deleteTodo = async ({ id }: { id: string }) => {
  try {
    const { data } = await axiosInstance.delete(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting todo", error);
    throw new Error("Error deleting todo");
  }
};
