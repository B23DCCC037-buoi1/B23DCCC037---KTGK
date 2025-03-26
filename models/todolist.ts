import type { Todo } from "../../services/TodoList/typings";

const defaultTodos: Todo[] = [
  { id: 1, task: "Learn all basic concepts of react", category: "React", completed: false, color: "#FF0000" },
  { id: 2, task: "Debugging in python project", category: "Python", completed: false, color: "#00CCCC" },
  { id: 3, task: "Learn and practice some concepts of maths", category: "Maths", completed: false, color: "#0088CC" },
  { id: 4, task: "Science study", category: "Science", completed: false, color: "#008000" },
  { id: 5, task: "Learn basic concepts of javascript", category: "JS", completed: false, color: "#A52A2A" },
  { id: 6, task: "Do dinner", category: "Dinner", completed: false, color: "#800080" },
  { id: 7, task: "Make a small project of react", category: "Project", completed: false, color: "#FF1493" },
  { id: 8, task: "Play cricket with friends", category: "Cricket", completed: false, color: "#0000FF" },
];

export const getTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : defaultTodos;
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const getRandomColor = (): string => {
  const colors = [
    "#FF0000", "#00CCCC", "#0088CC", "#008000", "#A52A2A", "#800080",
    "#FF1493", "#0000FF", "#228B22", "#FF8C00", "#00008B", "#4B0082",
    "#FFD700", "#6A0DAD", "#FF4500", "#DC143C"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
