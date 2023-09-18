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