let todo = JSON.parse(localStorage.getItem("todos")) || []
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("submit oldu");
  addTask();
});

window.onload  = () => displayTasks()

const updateLocalStorage = () => {
  localStorage.setItem("todos",JSON.stringify(todo))
}

const addTask = () => {
  const inputValue = document.querySelector("input").value;
  // console.log(inputValue);
  const taskPrio = document.querySelector("select").value
  if(inputValue){
    const newTask = {
      task : inputValue,
      degree : taskPrio
    }
    todo.push(newTask)
    displayTasks()
    form.reset()
  }else{
    alert("task yaz")
  }
}

const displayTasks = () => {
  const todoList = document.querySelector(".todo-list")
  todoList.innerHTML = ""
  todo.map(({task, degree}, index) => {
    const taskListItem = document.createElement("li")
    taskListItem.className = "task-list-item"
    taskListItem.innerHTML = `
    <div>
      <button class="btn btn-success edit-btn"><i class="bi bi-pencil-square"></i></button>
      <button class="btn btn-danger remove-btn" onclick="removeTask(${index})"><i class="bi bi-trash"></i></button>
    </div>
    <p class="card-text"><span>${degree}</span> ${task}</p>
    `
    todoList.appendChild(taskListItem)
  })
  updateLocalStorage()
}

const removeTask = (index) => {
  todo.splice(index,1)
  displayTasks()
}

const editTask = (index) => {

}
