import {
  saveTasksIntoLocalStorage,
  getTasksFromLocalStorage,
  getDateRepresentation,
} from "./utils.js";

const addTaskBtn = document.querySelector(".task-add__btn");
const input = document.querySelector(".task-add__input");
const todoTemplate = document.querySelector(".todo-template");
const todoListContainer = document.querySelector(".todo-list__list");

let taskList = getTasksFromLocalStorage();

addTaskBtn.addEventListener("click", () => {
  if (input.value.trim()) {
    const newTask = {
      id: Date.now(),
      text: input.value.trim(),
      completed: false,
      createdAt: getDateRepresentation(new Date()),
    };
    taskList.push(newTask);
    input.value = "";

    saveTasksIntoLocalStorage(taskList);
    renderTaskList();
  }
});

const createTodoLayout = (task) => {
  const todoElement = document.importNode(todoTemplate.content, true);

  const todoCheckbox = todoElement.querySelector(".item__checkbox");
  todoCheckbox.checked = task.completed;

  const todoText = todoElement.querySelector(".item__info-text");
  todoText.textContent = task.text;

  const todoDate = todoElement.querySelector(".item__info-date");
  todoDate.textContent = task.createdAt;

  const removeTodoBtn = todoElement.querySelector(".item__btn");
  removeTodoBtn.disabled = !task.completed;

  todoCheckbox.addEventListener("change", (e) => {
    taskList = taskList.map((t) => {
      if (t.id === task.id) {
        t.completed = e.target.checked;
      }
      return t;
    });
    saveTasksIntoLocalStorage(taskList);
    renderTaskList();
  });

  removeTodoBtn.addEventListener("click", () => {
    taskList = taskList.filter((t) => {
      if (t.id !== task.id) {
        return t;
      }
    });
    saveTasksIntoLocalStorage(taskList);
    renderTaskList();
  });

  return todoElement;
};

const renderTaskList = () => {
  todoListContainer.innerHTML = "";

  if (taskList.length === 0) {
    todoListContainer.innerHTML = "<h3>ToDo List is empty...</h3>";
  }

  taskList.forEach((task) => {
    const todoElement = createTodoLayout(task);
    todoListContainer.append(todoElement);
  });
};

renderTaskList();
