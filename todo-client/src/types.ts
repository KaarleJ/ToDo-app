export interface Todo {
  id: number;
  title: string;
  text: string;
  completed: boolean;
  deadLine?: Date | string | null | undefined;
}

export interface User {
  id: number;
  username: string;
}