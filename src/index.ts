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

let tasks: Task[] = [];
tasks.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const newTask: NewTask = {
    title: input.value,
    completed: false,
  };

  const id = uuidV4();

  tasks.push({
    userId: 1,
    id: id,
    ...newTask,
  });

  addListItem({
    userId: 1,
    id: id,
    ...newTask,
  });
  input.value = '';
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    if (task.completed) {
      item.classList.add('completed-task');
    } else {
      item.classList.remove('completed-task');
    }
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);

 
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.addEventListener('click', () => {
    removeTask(task.id);
  });

  item.append(label, removeButton); 
  list?.append(item);
}

function removeTask(id: string) {
  tasks = tasks.filter((task) => task.id !== id);
  refreshList();
}

function refreshList() {
  if (list) {
    list.innerHTML = ''; 
    tasks.forEach(addListItem); 
  }
}

async function fetchTasks() {
  try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Data not Found');
      }
      const data = await response.json();
      tasks = data.map((item: any) => ({
        userId: item.userId,
        id: item.id,
        title: item.title,
        completed: false,
      }));
      tasks.forEach(addListItem);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchTasks();