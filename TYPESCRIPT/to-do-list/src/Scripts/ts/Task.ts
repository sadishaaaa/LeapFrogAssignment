import { ID_LENGTH } from "./Constant";
import { getRandomString } from "./util";

export interface ITask {
  id: string;
  value: string;
  completed: boolean;
  assignedDate: Date | null;

  toggleCompleted: () => void;
  setCompleted: (completed: boolean) => void;
  getCompleted: () => boolean;

  setAssignedDate: (date: Date) => void;
  getAssignedDate: () => Date | null;

  setValue: (value: string) => void;
  getValue: () => string;
}

export class Task implements ITask {
  id: string;
  value: string;
  completed: boolean;
  assignedDate: Date | null;

  constructor(value = "", completed = false) {
    this.id = getRandomString(ID_LENGTH);
    this.value = value;
    this.completed = completed;
    this.assignedDate = new Date();
  }

  toggleCompleted = () => {
    this.completed = !this.completed;
  };

  setCompleted = (completed: boolean = true) => {
    this.completed = completed;
  };

  getCompleted = () => {
    return this.completed;
  };

  setAssignedDate = (date: Date) => {
    this.assignedDate = date;
  };

  getAssignedDate = () => {
    return this.assignedDate;
  };

  setValue = (value: string) => {
    this.value = value;
  };

  getValue = () => {
    return this.value;
  };
}
