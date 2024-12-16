import {
  saveTasksIntoLocalStorage,
  getTasksFromLocalStorage,
  getDateRepresentation,
} from "./utils.js";

const addTaskBtn = document.querySelector(".task-add__btn");
const addTaskInput = document.querySelector(".task-add__input");
const todoTemplate = document.querySelector(".todo-template");
const todoListContainer = document.querySelector(".todo-list__list");
const searchTaskInput = document.querySelector(".search__input");

let taskList = getTasksFromLocalStorage();
let filteredTaskList = [];

addTaskBtn.addEventListener("click", () => {
  if (addTaskInput.value.trim()) {
    const newTask = {
      id: Date.now(),
      text: addTaskInput.value.trim(),
      completed: false,
      createdAt: getDateRepresentation(new Date()),
    };
    taskList.push(newTask);
    addTaskInput.value = "";

    saveTasksIntoLocalStorage(taskList);
    renderTaskList();
  }
});

addTaskInput.addEventListener("input", () => {
  if (searchTaskInput.value.trim()) {
    searchTaskInput.value = "";
    renderTaskList();
  }
});

searchTaskInput.addEventListener("input", (e) => {
  filterAndRenderFilteredTaskList(e.target.value.trim());
  renderFilteredTaskList();
});

const filterAndRenderFilteredTaskList = (searchValue) => {
  filteredTaskList = taskList.filter((t) => {
    return t.text.includes(searchValue);
  });
  renderFilteredTaskList();
};

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

    if (searchTaskInput.value.trim()) {
      filterAndRenderFilteredTaskList(searchTaskInput.value.trim());
    } else {
      renderTaskList();
    }
  });

  removeTodoBtn.addEventListener("click", () => {
    taskList = taskList.filter((t) => {
      if (t.id !== task.id) {
        return t;
      }
    });
    saveTasksIntoLocalStorage(taskList);

    if (searchTaskInput.value.trim()) {
      filterAndRenderFilteredTaskList(searchTaskInput.value.trim());
    } else {
      renderTaskList();
    }
  });

  return todoElement;
};

const renderFilteredTaskList = () => {
  todoListContainer.innerHTML = "";

  if (filteredTaskList.length === 0) {
    todoListContainer.innerHTML = "<h3>Task not found...</h3>";
  }

  filteredTaskList.forEach((task) => {
    const todoElement = createTodoLayout(task);
    todoListContainer.append(todoElement);
  });
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
