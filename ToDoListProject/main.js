/* eslint-disable indent */
// UI Variables Defined
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all Event Listeners
loadEventListeners();

// Load all Event Listeners function

function loadEventListeners(){
  //DOM Loader Event
  document.addEventListener("DOMContentLoaded", getTasks);
	// Add Task Event & Updates Index
  form.addEventListener("submit", addTask);
  
	//Remove Task Event & Updates Index
  taskList.addEventListener("click",removeTask);

	//Clear Task Event
	clearBtn.addEventListener("click",clearTasks);
	//Filter Task Events
  filter.addEventListener("keyup",filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks")=== null) {
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
  // create <li> elements
	const li = document.createElement("li");
	//add Class to the <li> elemenet
  li.className = "collection-item"; 
	li.appendChild(document.createTextNode(task));
	//create new <a> tag
	const link = document.createElement("a");
	//adds class
	link.className = "delete-item right";
	//add the x(delete) icon
	link.innerHTML = "<i class=\"material-icons\">close</i>";
	//append link to li
	li.appendChild(link);
	//append li to ul
  taskList.appendChild(li);
  });
}

//Create Task Element and Append it to the DOM
function addTask(e){
	if(taskInput.value === ""){
		alert("Add A Task To The List!");
	}else{
    // create <li> elements
	const li = document.createElement("li");
	//add Class to the <li> elemenet
  li.className = "collection-item"; 
  let taskValue =  `${taskInput.value}`;
	li.appendChild(document.createTextNode(taskValue));
	//create new <a> tag
	const link = document.createElement("a");
	//adds class
	link.className = "delete-item right";
	//add the x(delete) icon
	link.innerHTML = "<i class=\"material-icons\">close</i>";
	//append link to li
	li.appendChild(link);
	//append li to ul
  taskList.appendChild(li);
  
  //Store In Local Storage
  storeTaskInLocalStorage(taskInput.value);

	//clear input
  taskInput.value = "";

  
  }
	

  //prevents default action from occuring
  e.preventDefault();
  
}

//Removes Task From The List
/*function removeTask(e) {
  //
  if (e.target.parentElement.classList.contains("delete-item")){
    if(confirm("Are You Sure You Would Like To Delete This Task?")){
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
*/
function removeTask(e) {
  if(e.target.parentElement.classList.contains("delete-item")) {
    if(confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Clears all tasks from Collection
function clearTasks(){
  //confirmation for deleting all tasks
  if (confirm("Are You Sure You Would Like To Delete All Tasks?") ) {
    //while loop that goes through the taskList and deletes the children until there isn't any left
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
  }
	clearLocalStorage();
}

function clearLocalStorage() {
  localStorage.clear();
}
//Function to filter tasks by letters
function filterTasks(e){
  //Sets the text on every keyup to the variable, changes it to lowercase 
	const text = e.target.value.toLowerCase();
  //Selects all of the .colelction-items and calls a for Each loop on the array of items
	document.querySelectorAll(".collection-item").forEach(function(task){
    //sets an item to have the text content of the firstChild of the ".collection-item" parent
    const item = task.firstChild.textContent;
    //sets the text content to all lowercase to match the filter, then seaches through the text content as if it were an array
		if (item.toLowerCase().indexOf(text) != -1) {
      //if it exists it will be displayed
			task.style.display = "block";
		} else {
      //if it doesn't exist it won't be displayed
			task.style.display = "none";
		}
	});
}


function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks")=== null) {
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks",JSON.stringify(tasks));


}
/*
function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks")=== null) {
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks",JSON.stringify(tasks));
}*/
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index){
    
    if((taskItem.textContent) === (task+"close")){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}