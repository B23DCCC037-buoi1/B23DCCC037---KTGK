import { Task } from '@/models/TaskManager/Task';

const TASKS_PREFIX = 'taskmanager_tasks_';
const CURRENT_USER_KEY = 'taskmanager_current_user';

export const getCurrentUser = (): string | null => {
  return localStorage.getItem(CURRENT_USER_KEY);
};

export const setCurrentUser = (username: string) => {
  localStorage.setItem(CURRENT_USER_KEY, username);
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getTasks = (): Task[] => {
  const user = getCurrentUser();
  if (!user) return [];
  const data = localStorage.getItem(TASKS_PREFIX + user);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: Task[]) => {
  const user = getCurrentUser();
  if (!user) return;
  localStorage.setItem(TASKS_PREFIX + user, JSON.stringify(tasks));
};
