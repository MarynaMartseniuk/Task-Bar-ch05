// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || [];

// Todo: create a function to generate a unique task id
function newId() {

    let letterId = '';
    let numberId = '';
    let newIdValue = '';

    for (let i = 0; i < 2; i++) {
        newLetter  = Math.floor(Math.random() * 58) + 65;
        letterId = letterId + String.fromCharCode(newLetter);
    };

    for (let j = 0; j < 5; j++) {
        newNumber  = Math.floor(Math.random() * 10) + 48;
        numberId = numberId  + String.fromCharCode(newNumber);
    };

    newIdValue = letterId + '-' + numberId;
    // console.log(newTaskId);
    return newIdValue;

}; 

function generateTaskId() {

    newTaskId = newId();

    //TODO: save every id to the Local Storage and check if local storage does not have lement with such value
    // #1. get data from Local Storage: 
    let nextId = JSON.parse(localStorage.getItem("nextId"));

    // #2. loop through the data from Local Storage (for-loop) to check if a new id (newTaskId) matchs any id from Local Storage. IF a new id matches any value (everyID) from array  then call function newId() to generate a newTaskId again.
    nextId.forEach(everyID => {
        if (everyID===newTaskId) {
            newId();
        };
    });

    // #3.save a new id to Local Storage 
    nextId.push(newTaskId);
    localStorage.setItem('nextId', JSON.stringify(nextId));
    
    return newTaskId; 
    };

// Todo: create a function to create a task card
function createTaskCard(event) {
    // event.stopPropagation();
    
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

    //#1. create cards from LocalStorage info (localStorage.getItem("tasks")) and set all necessary attributes to elements
    const toDoColumn = document.querySelector('#todo-cards');
    
    //TEST cards (use this because Local storage is not set up yet. Delete it after functionality is done and create card with LocalStorage info)

    // test card1
    card1 = document.createElement('div');
    //card1.setAttribute('id', 'draggable');
    card1.setAttribute('class', 'ui-widget-content');
    card1.setAttribute('onmousedown', 'mouseDown()');
    card1.setAttribute('onmouseup', 'mouseUp()');
    card1.setAttribute('onmouseenter', 'mouseEnter()');
    //card1.setAttribute('onmouseleave', 'mouseLeave()');

    textTitle1 = document.createElement('p');
    textTitle1.textContent = 'task title';
    card1.appendChild(textTitle1);
    toDoColumn.appendChild(card1);

    textDescription1 = document.createElement('p');
    textDescription1.textContent = 'task Description';
    card1.appendChild(textDescription1);
    toDoColumn.appendChild(card1);

    textDueDate1 = document.createElement('p');
    textDueDate1.textContent = 'task DueDate';
    card1.appendChild(textDueDate1);
    toDoColumn.appendChild(card1);
    //end of card1

    // test card2
    card2 = document.createElement('div');
    //card2.setAttribute('id', 'draggable');
    card2.setAttribute('class', 'ui-widget-content');
    card2.setAttribute('onmousedown', 'mouseDown()');
    card2.setAttribute('onmouseup', 'mouseUp()');
    card2.setAttribute('onmouseenter', 'mouseEnter()');
    //card2.setAttribute('onmouseleave', 'mouseLeave()');

    textTitle2 = document.createElement('p');
    textTitle2.textContent = 'task title';
    card2.appendChild(textTitle2);
    toDoColumn.appendChild(card2);

    textDescription2 = document.createElement('p');
    textDescription2.textContent = 'task Description';
    card2.appendChild(textDescription2);
    toDoColumn.appendChild(card2);

    textDueDate2 = document.createElement('p');
    textDueDate2.textContent = 'task DueDate';
    card2.appendChild(textDueDate2);
    toDoColumn.appendChild(card2);
    //end of card2

    // end of TEST cards
    
    // #2. Find element that is currently draggable 
        //set attribute id='draggable' (only one element can have this id) to that element and delete this attribute when that element is dropped

        // source: https://www.w3schools.com/jsref/event_onmouseenter.asp

        //The onmouseenter event occurs when the mouse pointer enters an element. This attribute is set up only for the card[i] = document.createElement('div'); (for each card that is created). 
    function mouseEnter() {

            // When mause enters this element we are listernung for:
            //#2.1. the mouse button is pressed over the element. And if it is so then set attribute id='draggable' for this element. The mouseDown() is set up only for card[i] = document.createElement('div');.
        function mouseDown() {
            // $(this).setAttribute('id', 'draggable');
            // $(this).style.backgroundColor= "red";
            document.querySelector('.ui-widget-content').setAttribute('id', 'draggable');
            document.querySelector('.ui-widget-content').style.color = "red";
            
        };

            //#2.2. the mouse button is released over an element. And if it is so then remove attribute id='draggable' from this element. The mouseUp() is set up only for card[i] = document.createElement('div');.
        function mouseUp() {
            document.querySelector('.ui-widget-content').removeAttribute('id', 'draggable');
            document.querySelector('.ui-widget-content').style.color = "green";
        };
    };
    
    //  ???move this function inside of function mouseDown()???
    // #3. function that handles drag and drop the element 
    $( function() {

            // #3.1. make draggable element be draggable
            // "#draggable" - the element that we defined with the function mouseDown()
            // .draggable() - function that make this element ("#draggable") draggable
        $("#draggable").draggable();

            //#3.2. make columns <div>s droppable so we can drop there the draggable element
            // ".droppable" - all elements with the class='droppable' (our columns)
        $( ".droppable" ).droppable({

                    // #3.2.1. handle drop event by using function handleDrop(event, ui) 
                drop: function handleDrop(event, ui) {
                        // event - event itself
                        // ui - ui oject that triggered the event, the element that user drag and drop. This element has property "draggable"
                    $('.droppable').append(ui.draggable);
                }
        });
        
    });
}
    
// Todo: create a function to handle adding a new task
function handleAddTask(event){

    var taskTitleInput = document.querySelector('#taskTitle');
    var taskDescriptionInput = document.querySelector('#taskDescription');
    var taskDueDateInput = document.querySelector('#taskDueDate');
    var addNewTask ={}; // new task object
    // var taskList = JSON.parse(localStorage.getItem("tasks")) || []; // it is already declared on the top of this file.Array of tasks objects that saved in Local Storage. It is data that is already saved to local stogare or empty array if local storage is empty
    var tip;
    
    // if user provided all neccesary info then code will work with it (save to Local Storage, display on the page) 
    if (taskTitleInput.value 
        && taskDescriptionInput.value
        && taskDueDateInput.value) {

                //get Task ID
        const displayTaskID = document.querySelector('#taskId');
        createIdEl = document.createElement('h4');
        createSpan = document.createElement('span'); // createSpan is a unique ID value for task card

        createIdEl.textContent = 'Task ID#  ';
        createSpan.textContent = generateTaskId();

        // displayTaskID.appendChild(createIdEl);
        createIdEl.appendChild(createSpan);
        displayTaskID.appendChild(createIdEl);

        // set an id attrubute for just has created element with the value of card id
        createSpan.setAttribute('id', createSpan.textContent);
                // end of get Task ID
                                    
                // get data-format for day input so day.js can work with
        const dueDateDayJS = dayjs(taskDueDateInput.value);
        // console.log(dueDateDayJS);
        
                // save data of a new task to the Local Storage
        addNewTask = {
        ID: createSpan.value,
        status: 'Not Yet Started',
        title: taskTitleInput.value,
        description: taskDescriptionInput.value,
        dueDate: dueDateDayJS
        };
        // console.log(addNewTask);
        
        taskList.push(addNewTask);

        localStorage.setItem('tasks', JSON.stringify(taskList));
        tip.textContent = '';
    } else {
        tip = document.createElement('p');
        tip.textContent = " please, fill in all data!"
    };

    taskTitleInput.textContent.value = '';
    taskDescriptionInput.value = '';
    taskDueDateInput.value = "2024-01-01";

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    
}

// // Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {
//     // event - event itself
//     // ui - ui oject that triggered the event, the element that user drag and drop. This element has property "draggable"
//     // $(this).append(ui.draggable);


//     $('.droppable').append(ui.draggable);
// }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();

    const addNewTaskButton = document.querySelector('#addNewTaskBtn');
    addNewTaskButton.addEventListener('click', createTaskCard());

    const saveDataButton = document.querySelector('#saveNewTaskDataBtn');
    saveDataButton.addEventListener('click', handleAddTask ());
    
});


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
// // document.addEventListener('DOMContentLoaded', function () {} - to ensure our script runs after the DOM has fully loaded.
// document.addEventListener('DOMContentLoaded', function () {
//     // $('#myModal').on('shown.bs.modal', function () {} - to ensure the modal is fully loaded and the modal has been made visible to the user. And only after the code ewill run.
//     $('#myModal').on('shown.bs.modal', function () {
//       // Attach an event listener to the button inside the modal

//       const saveDataButton = document.querySelector('.saveNewTaskDataBtn');
//       saveDataButton.addEventListener('click', handleAddTask());
//     });
//   });
  