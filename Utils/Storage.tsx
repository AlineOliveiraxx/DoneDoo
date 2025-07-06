import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from './types';

const TASKS_KEY = '@tasks';

export const getTasks = async (): Promise<Task[]> => {
  const json = await AsyncStorage.getItem(TASKS_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveTask = async (task: Task): Promise<void> => {
  const tasks = await getTasks();
  const updated = tasks.filter((t: Task) => t.id !== task.id).concat(task);
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

export const deleteTask = async (id: string): Promise<void> => {
  const tasks = await getTasks();
  const filtered = tasks.filter((t: Task) => t.id !== id);
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(filtered));
};