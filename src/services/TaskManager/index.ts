import { Task } from '@/models/TaskManager/Task';

const TASKS_KEY = 'tasks';
const USER_KEY = 'currentUser';

export const getTasks = (): Task[] => {
  return JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getCurrentUser = (): string | null => {
  return localStorage.getItem(USER_KEY);
};

export const setCurrentUser = (username: string) => {
  localStorage.setItem(USER_KEY, username);
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};