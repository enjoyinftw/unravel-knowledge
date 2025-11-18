export type TodoStatus = "OPEN" | "FINISHED"

export type Todo = {
  id: string;
  text: string;
  status: TodoStatus;
};

type TodoList = Todo[];

export const FakeTodoList: TodoList = [
  {
    id: "1",
    text: "first",
    status: "OPEN",
  },
  {
    id: "2",
    text: "second",
    status: "OPEN",
  },
  {
    id: "3",
    text: "third",
    status: "OPEN",
  },
];
