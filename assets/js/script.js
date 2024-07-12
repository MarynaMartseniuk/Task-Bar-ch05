// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
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
function createTaskCard() {
    
    const displayTaskStatus = document.querySelector('#taskStatus');
    createStatusEl = document.createElement('h4');
    createStatusSpan = document.createElement('span');

    createStatusEl.textContent = 'Task Status is ';
    createStatusSpan.textContent = 'Not Yet Started';

    createStatusSpan.style.fontStyle = 'italic';
    createStatusSpan.style.fontWeight = 'bold';
    
    createStatusEl.appendChild(createStatusSpan);
    displayTaskStatus.appendChild(createStatusEl);

};


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    // const toDoColumn = document.querySelector('#todo-cards');
    // var card;
    
    // card = document.createElement('div');
    // card.setAttribute('id', 'draggable');
    // card.setAttribute('class', 'ui-widget-content');

    // text = document.createElement('p');
    // text.textContent = 'test card';
    // card.appendChild(text);
    // toDoColumn.appendChild(card);
    // //source https://jqueryui.com/draggable/#default
    // $( function() {
    //     $( "#draggable" ).draggable();
    // } );
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    //event.stopPropagation();

    //wait for Modal to be opened and then what you need to do.
    $('#formModal').on('shown.bs.modal', function () {

        //set an event listener for the SAVE button. So at this moment user should 
        const saveDataButton = document.querySelector('#saveNewTaskDataBtn');

        saveDataButton.addEventListener('click', function () {

            // if user provided all neccesary info then code will work with it (save to Local Storage, display on the page) 
            if (taskTitleInput.value 
                && taskDescriptionInput.value
                && taskDueDateInput.value) {

                var addNewTask = {};

                var taskTitleInput = document.querySelector('#taskTitle').value;
                var taskDescriptionInput = document.querySelector('#taskDescription').value;
                var taskDueDateInput = document.querySelector('#taskDueDate').value;

                console.log(taskTitleInput);
 
                        //get Task ID
                const displayTaskID = document.querySelector('#taskId');
                createIdEl = document.createElement('h4');
                createSpan = document.createElement('span');

                createIdEl.textContent = 'Task ID#  ';
                createSpan.textContent = generateTaskId();

                // displayTaskID.appendChild(createIdEl);
                createIdEl.appendChild(createSpan);
                displayTaskID.appendChild(createIdEl);
                // createSpan.setAttribute('id', createSpan.textContent);
                        // end of get Task ID
                                          

                        // get data-format for day input so day.js can work with
                const dueDateDayJS = dayjs(taskDueDateInput.value);
                console.log(dueDateDayJS);
                    
                        // create a new task object to add it to taskList array (that store tasks date in the Local Storage)
                addNewTask = {
                    ID: createSpan.value,
                    status: 'Not Yet Started',
                    title: taskTitleInput.value,
                    description: taskDescriptionInput.value,
                    dueDate: dueDateDayJS
                }
                console.log(addNewTask);
            
            };
    
          taskTitleInput.textContent = '';
        });
      
    });
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

// const saveDataButton = document.querySelector('.saveNewTaskDataBtn');
// saveDataButton.addEventListener('submit', handleAddTask()); 



// add event listener on SAVE Button (to save new task data to Local Storage and display it on the screen). 
// Sourse: chat GPT:
        // document.addEventListener('DOMContentLoaded', function () {
        //     // Wait until the modal is fully loaded
        //     $('#myModal').on('shown.bs.modal', function () {
        //       // Now the modal is fully shown
        //       // Attach an event listener to the button inside the modal
        //       document.getElementById('modalActionButton').addEventListener('click', function () {
        //         // Action to perform when the button is clicked
        //         console.log('Button inside modal clicked!');
        //         // You can add your custom logic here
        //       });
        //     });
        //   });
// document.addEventListener('DOMContentLoaded', function () {} - to ensure our script runs after the DOM has fully loaded.
document.addEventListener('DOMContentLoaded', function () {
    // $('#myModal').on('shown.bs.modal', function () {} - to ensure the modal is fully loaded and the modal has been made visible to the user. And only after the code ewill run.
    $('#myModal').on('shown.bs.modal', function () {
      // Attach an event listener to the button inside the modal

      const saveDataButton = document.querySelector('.saveNewTaskDataBtn');
      saveDataButton.addEventListener('click', handleAddTask());
    });
  });
  

  const toDoColumn = document.querySelector('#todo-cards');
    var card;
    
    card = document.createElement('div');
    card.setAttribute('id', 'draggable');
    card.setAttribute('class', 'ui-widget-content');

    text = document.createElement('p');
    text.textContent = 'test card';
    card.appendChild(text);
    toDoColumn.appendChild(card);
    //source https://jqueryui.com/draggable/#default
    $( function() {
        $( "#draggable" ).draggable();
    } );