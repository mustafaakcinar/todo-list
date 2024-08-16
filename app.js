let todo = JSON.parse(localStorage.getItem("todos")) || []

// ^ submit eventi
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // sayfanın submit oldugunda onload olmasını engelledik
  // console.log("submit oldu");
  addTask();
  document.querySelector("form").reset() // submit edildikten sonra form temizlendi
});

window.onload  = () => displayTasks() // sayfa yüklendiğinde tasklar görünecek


//^ localStorage güncelleme fonskiyonumuz
const updateLocalStorage = () => {
  localStorage.setItem("todos",JSON.stringify(todo))
}


//^ yeni task ekleme fonksiyonu
const addTask = () => {
  const inputValue = document.querySelector("input").value;
  // console.log(inputValue);
  const taskPrio = document.querySelector("select").value
  if(inputValue.trim()){
    const newTask = {
      task : inputValue,
      degree : taskPrio,
      check : false
    }
    // console.log(taskPrio);
    if(taskPrio == "Standard"){
      todo.push(newTask)
    }else{
      todo.unshift(newTask)
    }
    Swal.fire({
      title: "Lets go!",
      text: "There's one more thing you need to do now...",
      icon: "success"
    });
    displayTasks()
  }else{
    Swal.fire({
      title: "Something wrong...",
      text: "Task area cant be empty...",
      icon: "error"
    });
  }
}

// ^ ekrana yazdırmak için kullandığımız fonksiyon
const displayTasks = () => {
  const todoList = document.querySelector(".todo-list")
  todoList.innerHTML = ""
  // * proje başında tanımladığımız arrayden verilerimizi çekip dönerek ekrana yazdırıyoruz
  todo.map(({task, degree, check}, index) => {
    const taskListItem = document.createElement("li")
    taskListItem.className = "task-list-item"
    if(check){
      taskListItem.classList.add("task-checked")
    }else{
      taskListItem.classList.remove("task-checked")
    }
    taskListItem.innerHTML = `
    <div>
      <button class="btn btn-success edit-btn" onclick="editTask(this)"><i class="bi bi-pencil-square"></i></button>
      <button class="btn btn-danger remove-btn" onclick="removeTask(${index})"><i class="bi bi-trash"></i></button>
    </div>
    <p class="card-text"><span>${degree}</span> <strong>${task}</strong></p>
    `
    todoList.appendChild(taskListItem)
  })
  checkedFunc() // localde check etmelerimizi saklamak için kullanılan fonksiyonumuzu çağırıyoruz
  // console.log(document.querySelector(".todo-list").children);
  updateLocalStorage()
}


//^ check fonksiyonu
const checkedFunc = () => {
  Array.from(document.querySelector(".todo-list").children).forEach((item) => {
    // console.log(item);
    item.onclick = () => {
      todo.map((element,index,todo) => {
        if(element.task == item.querySelector("p strong").textContent){
          if(item.classList.contains("task-checked")){
            item.classList.remove("task-checked")
            todo[index].check = false
            updateLocalStorage()
          }else{
            item.classList.add("task-checked")
            todo[index].check = true
            updateLocalStorage()
          }
        }
      })
    }
  })
}

// ^ index kullanarak arrayden todo kaldırma fonksiyonumuz
const removeTask = (index) => {
  todo.splice(index,1)
  displayTasks()
}

//^ edit tuşuna basıldığında input açarak edit işlemi yaptıran fonksiyonumuz
const editTask = (taskEdit) => {
  // console.log(taskEdit);

  const oldTask = taskEdit.closest("li").querySelector("p strong")

  const input2 =  document.createElement("input")
  input2.type = "text"
  input2.className = "form-control"
  input2.value = oldTask.textContent;
  // console.log(input);
  // console.log(oldTask.textContent);
  taskEdit.closest("li").querySelector("p").replaceChild(input2, oldTask)

  input2.onkeydown = (e) => {
    if(e.key == "Enter" && input2.value != ""){
      // console.log("buraya girdi");
      todo.map((item,index,todo) => {
        // console.log(item.task);
        // console.log(oldTask);
        if(item.task == oldTask.textContent){
          // console.log("girdi");
          todo[index].task = input2.value 
        }
      })
      oldTask.textContent = input2.value
      taskEdit.closest("li").querySelector("p").replaceChild(oldTask, input2) // en yakın li elementinden ulaşarak replaceChild metoduyla yerlerini değiştiriyoruz
      displayTasks()
    }else if((e.key == "Enter" && input2.value.trim() == "")){
      e.preventDefault()
      Swal.fire({
        title: "Something wrong...",
        text: "Task area cant be empty...",
        icon: "error"
      });
    }
  }
}







