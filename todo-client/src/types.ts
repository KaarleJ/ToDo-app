export interface Todo {
  id: string;
  title: string;
  text: string;
  deadline: Date
  status: boolean;
}

export interface TodosPage {
  content: Todo[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalPages: number;
}