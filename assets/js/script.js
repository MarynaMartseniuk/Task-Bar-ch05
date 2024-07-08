// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id

function generateTaskId() {
    let letterId = '';
    let numberId = '';

    for (let i = 0; i < 2; i++) {
        newLetter  = Math.floor(Math.random() * 58) + 65;
        letterId = letterId + String.fromCharCode(newLetter);
    };

    for (let j = 0; j < 5; j++) {
        newNumber  = Math.floor(Math.random() * 10) + 48;
        numberId = numberId  + String.fromCharCode(newNumber);
    };

    newTaskId = letterId + '-' + numberId;
    // console.log(newTaskId);
    return newTaskId;
    };

// Todo: create a function to create a task card
function createTaskCard(task) {
    
    //get Task ID
    const displayTaskID = document.querySelector('#taskId');
    createIdEl = document.createElement('h4');
    createIdEl.textContent = 'Task ID#  ' + generateTaskId();
    displayTaskID.appendChild(createIdEl);


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    //source https://jqueryui.com/draggable/#default
    $( function() {
        $( "#draggable" ).draggable();
    } );


}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});


const addNewTaskButton = document.querySelector('#addNewTaskBtn');
addNewTaskButton.addEventListener('click', createTaskCard());

