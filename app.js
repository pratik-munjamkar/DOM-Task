//define UI variables
const form=document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput=document.querySelector('#task')
//load all event listeners
loadEventListeners();
//function
function loadEventListeners(){
  document.addEventListener('DOMContentLoaded',getTasks);
  form.addEventListener('submit',addTask);
  taskList.addEventListener('click',removeTask);
  clearBtn.addEventListener('click',clearTasks);
  filter.addEventListener('keyup',filterTasks);
}

function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    //create element
    const li = document.createElement('li');
    //classname
    li.className='collection-item';
    //create text node and append it to li
    li.appendChild(document.createTextNode(task));
    //create a link
    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    //appending link to li
    li.appendChild(link);
    //and now li to ul
    taskList.appendChild(li);
  });
}
function addTask(e){
if(taskInput.value === ''){
  alert('Add a task');
}

//create element
const li = document.createElement('li');
//classname
li.className='collection-item';
//create text node and append it to li
li.appendChild(document.createTextNode(taskInput.value));
//create a link
const link=document.createElement('a');
link.className='delete-item secondary-content';
link.innerHTML='<i class="fa fa-remove"></i>';
//appending link to li
li.appendChild(link);
//and now li to ul
taskList.appendChild(li);
//store in LS
storeTaskInLocalStorage(taskInput.value);
//clear tasks
taskInput.value = '';
e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();//li
    //remove tasks from ls
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
  }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
function clearTasks(e){
  //taskList.innerHTML='';
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  //clear from ls
  clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });

}