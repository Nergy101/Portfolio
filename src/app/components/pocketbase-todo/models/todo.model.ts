import { Record } from "pocketbase";

export interface TodoRecord extends Record {
  id: string;
  title: string;
  tasks: TaskRecord[]
}

export interface TaskRecord extends Record {
  id: string;
  description: string;
  finished: boolean;
}
