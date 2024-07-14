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

    const toDoColumn = document.querySelector('#todo-cards');

    const newTaskTitle = document.querySelector('#taskTitle');
    const newtaskDescription = document.querySelector('#taskDescription');
    const newtaskDueDate = document.querySelector('#taskDueDate');

    var tip;

    if (newTaskTitle.value 
        && newtaskDescription.value
        && newtaskDueDate.value) { 

        card = document.createElement('div');
        card.style.margin = '5px';
        //card.setAttribute('id', 'draggable');
        card.setAttribute('class', 'ui-widget-content');
        card.setAttribute('onmousedown', 'mouseDown()');
        card.setAttribute('onmouseup', 'mouseUp()');
        card.setAttribute('onmouseenter', 'mouseEnter()');
        //card.setAttribute('onmouseleave', 'mouseLeave()');

        //get Task ID
        createIdEl = document.createElement('h4');
        createSpan = document.createElement('span'); // createSpan value is a unique ID value for task card
        createIdEl.textContent = 'Task ID#  ';
        createSpan.textContent = generateTaskId();
        createIdEl.appendChild(createSpan);
        card.appendChild(createIdEl);

        textTitle = document.createElement('p');
        textTitle.textContent = newTaskTitle.value;
        card.appendChild(textTitle);
        
        textDescription = document.createElement('p');
        textDescription.textContent = newtaskDescription.value;
        card1.appendChild(textDescription);
        
        textDueDate = document.createElement('p');
        textDueDate.textContent = dayjs(newtaskDueDate.value);
        card.appendChild(textDueDate);
        
        del = document.createElement('button');
        del.textContent = 'Delete task';
        del.setAttribute('id', 'deleteBtn');
        // set an id attrubute for DELETE button with the value of just has created unique task id
        del.setAttribute('id', createSpan.textContent);

        toDoColumn.appendChild(card);

        // save info about new task to Local Storage:
        handleAddTask(event);

        tip.textContent = '';

        } else {

        tip = document.createElement('p');
        tip.textContent = " please, fill in all data!";
        card.appendChild(tip);
        
    };

    taskTitleInput.textContent.value = '';
    taskDescriptionInput.value = '';
    taskDueDateInput.value = "2024-01-01";
           
};


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    
    // #1. Find element that is currently draggable 
        //set attribute id='draggable' (only one element can have this id) to that element and delete this attribute when that element is dropped

        // source: https://www.w3schools.com/jsref/event_onmouseenter.asp

        //The onmouseenter event occurs when the mouse pointer enters an element. This attribute is set up only for the card[i] = document.createElement('div'); (for each card that is created). 
    function mouseEnter() {

            // When mause enters this element we are listernung for:
            //#1.1. the mouse button is pressed over the element. And if it is so then set attribute id='draggable' for this element. The mouseDown() is set up only for card[i] = document.createElement('div');.
        function mouseDown() {
            // $(this).setAttribute('id', 'draggable');
            // $(this).style.backgroundColor= "red";
            document.querySelector('.ui-widget-content').setAttribute('id', 'draggable');
            document.querySelector('.ui-widget-content').style.color = "red";
            
        };

            //#1.2. the mouse button is released over an element. And if it is so then remove attribute id='draggable' from this element. The mouseUp() is set up only for card[i] = document.createElement('div');.
        function mouseUp() {
            document.querySelector('.ui-widget-content').removeAttribute('id', 'draggable');
            document.querySelector('.ui-widget-content').style.color = "green";
        };
    };
    
    //  ???move this function inside of function mouseDown()???
    // #2. function that handles drag and drop the element 
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

    // const newTaskTitle = document.querySelector('#taskTitle');
    // const newtaskDescription = document.querySelector('#taskDescription');
    // const newtaskDueDate = document.querySelector('#taskDueDate');
    var addNewTask ={}; // new task object
          
    addNewTask = {
    ID: createSpan.value,
    title: textTitle.value,
    description: textDescription.value,
    dueDate: textDueDate.value
    };
    // console.log(addNewTask);
    
    taskList.push(addNewTask);

    localStorage.setItem('tasks', JSON.stringify(taskList));

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    
        // #1. get id of the task that was clicked (taskDelId). It is equel to id value of the DELETE button that was clicked.
        // sourse: modal-04 activity-19
        const cardLocation = document.querySelector('#columns');
        let taskDelId;
    
        cardLocation.addEventListener('click', function(event) {
            const cardToDeleteBtn = event.target;
            taskDelId = cardToDeleteBtn.getAttribute('id');
        });
    
    
            // #2. get array from Local Storage: 
        taskList = JSON.parse(localStorage.getItem("tasks"));
    
            // #3. find element of array that has value as the card id and delete this element from the array: 
        let position = taskList.indexOf(taskDelId);
        taskList.splice(position, 1);
    
            // #4. save new array to Local Storage: localStorage.setItem('tasks', JSON.stringify(taskList));
        localStorage.setItem('tasks', JSON.stringify(taskList));
    
            // #5. delete the card which is a parent element of DELETE button
        const cardToDelete = document.querySelector('#${taskDelId}');
        cardToDelete.parentElement.remove();
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
    handleDeleteTask();

    const saveDataButton = document.querySelector('#saveNewTaskDataBtn');
    saveDataButton.addEventListener('click', createTaskCard());
    
});

//===================================================================
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

// ============================================================
//TEST cards (use this because Local storage is not set up yet. Delete it after functionality is done and create card with LocalStorage info)

const toDoColumn = document.querySelector('#todo-cards');
    
// test card1

card1 = document.createElement('div');
card1.style.margin = '5px'
//card1.setAttribute('id', 'draggable');
card1.setAttribute('class', 'ui-widget-content');
card1.setAttribute('onmousedown', 'mouseDown()');
card1.setAttribute('onmouseup', 'mouseUp()');
card1.setAttribute('onmouseenter', 'mouseEnter()');
//card1.setAttribute('onmouseleave', 'mouseLeave()');

createIdEl1 = document.createElement('h4');
createSpan1 = document.createElement('span'); // createSpan value is a unique ID value for task card
createIdEl1.textContent = 'Task ID#  ';
createSpan1.textContent = 'AA-123456';
createIdEl1.appendChild(createSpan1);
card1.appendChild(createIdEl1);

textTitle1 = document.createElement('p');
textTitle1.textContent = 'task1 title';
card1.appendChild(textTitle1);

textDescription1 = document.createElement('p');
textDescription1.textContent = 'task1 Description';
card1.appendChild(textDescription1);

textDueDate1 = document.createElement('p');
textDueDate1.textContent = 'task1 DueDate';
card1.appendChild(textDueDate1);


del1 = document.createElement('button');
del1.textContent = 'Delete task';
del1.setAttribute('id', 'deleteBtn');
card1.appendChild(del1);
del1.setAttribute('id', createSpan1.textContent);

toDoColumn.appendChild(card1);
//end of card1

// test card2
card2 = document.createElement('div');
card2.style.margin = '5px'
//card2.setAttribute('id', 'draggable');
card2.setAttribute('class', 'ui-widget-content');
card2.setAttribute('onmousedown', 'mouseDown()');
card2.setAttribute('onmouseup', 'mouseUp()');
card2.setAttribute('onmouseenter', 'mouseEnter()');
//card2.setAttribute('onmouseleave', 'mouseLeave()');

createIdEl2 = document.createElement('h4');
createSpan2 = document.createElement('span'); // createSpan value is a unique ID value for task card
createIdEl2.textContent = 'Task ID#  ';
createSpan2.textContent = 'BB-654321';
createIdEl2.appendChild(createSpan2);
card2.appendChild(createIdEl2);

textTitle2 = document.createElement('p');
textTitle2.textContent = 'task2 title';
card2.appendChild(textTitle2);

textDescription2 = document.createElement('p');
textDescription2.textContent = 'task2 Description';
card2.appendChild(textDescription2);

textDueDate2 = document.createElement('p');
textDueDate2.textContent = 'task2 DueDate';
card2.appendChild(textDueDate2);

del2 = document.createElement('button');
del2.textContent = 'Delete task';
del2.setAttribute('id', 'deleteBtn');
card2.appendChild(del2);
del2.setAttribute('id', createSpan2.textContent);

toDoColumn.appendChild(card2);
//end of card2

  