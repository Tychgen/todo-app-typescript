import {v4 as uuidV4} from 'uuid'

type Task = {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
};

type NewTask = {
  title: string;
  completed: boolean;
};

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');