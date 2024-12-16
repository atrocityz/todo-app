const TASKS_KEY = "todos";

export const saveTasksIntoLocalStorage = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasksFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
};

export const getDateRepresentation = (taskCreatedDate) => {
  return Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(taskCreatedDate);
};
