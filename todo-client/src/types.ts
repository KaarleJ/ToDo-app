export interface Todo {
  id: number;
  title: string;
  text: string;
  completed: boolean;
  deadline?: Date | null | undefined; 
}

export interface User {
  id: number;
  username: string;
}