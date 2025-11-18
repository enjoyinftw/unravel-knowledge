import { useCallback, useState, memo } from "react";
import { FakeTodoList, TodoStatus, Todo } from "@/faker/fakeToDo";
import Button from "../Button/Button";

type TodoItemProps = {
  todo: Todo;
  textChange: (id: string, text: string) => void;
  statusChange: (id: string, status: TodoStatus) => void;
  deleteTodo: (id: string) => void;
};

const TodoList = () => {
  const [tasks, setTasks] = useState(FakeTodoList);

  const handleTextChange = useCallback((id: string, text: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, text } : task)));
  }, []);

  const handleStatusChange = useCallback((id: string, status: TodoStatus) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, status } : task)));
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  return (
    <ol>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          todo={task}
          textChange={handleTextChange}
          statusChange={handleStatusChange}
          deleteTodo={handleDelete}
        />
      ))}
    </ol>
  );
};

const TodoItem = memo(({ todo, textChange, statusChange, deleteTodo }: TodoItemProps) => {
  return (
    <li>
      <span>Title: {todo.text}</span>
      <br />
      <span>Status: {todo.status}</span>
      <br />
      <div>
        <Button
          onClick={() => textChange(todo.id, "placeholder")}
          label="change Text"
        />
        <Button
          onClick={() => statusChange(todo.id, todo.status === "OPEN" ? "FINISHED" : "OPEN")}
          label={todo.status === "OPEN" ? "FINISHED" : "OPEN"}
        />
        <Button
          onClick={() => deleteTodo(todo.id)}
          label="delete Todo"
        />
      </div>
    </li>
  );
});

export default TodoList;
