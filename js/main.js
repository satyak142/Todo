// class constructor for taskToDo and TaskDaily
class TaskToDo {
    constructor(title,date,priority,info){
        this.title = title;
        this.date = date;
        this.priority = priority;
        this.info = info;
    }
}
// for the form toggle event
document.querySelector('#formToggle').addEventListener('click',formToggle);
document.querySelector('#formCancel').addEventListener('click',formToggle);

function formToggle(){
    document.querySelector('#formTask').classList.toggle('d-none');
}
// task submission event
document.querySelector('#taskSubmit').addEventListener('click',taskSubmit);

function taskSubmit(e){
    e.preventDefault();//stop default behaviour
    // taking task values from dom
    const title = document.querySelector('#myTask').value;
    const taskDate =new Date(document.querySelector('#taskDate').value);
    const priority = document.querySelector('#priority').value;
    const info = document.querySelector('#addInfo').value;
    // initiating task
    const task = new TaskToDo(title,taskDate,priority,info)
    addTask(task)
    clearFields()
}
// function to add task to document
function addTask(task){
    // selecting table of tasks
    const taskList = document.querySelector('#taskList');
    taskNum = taskList.childElementCount
    // creating html syntax for the new task 
    let newRow = document.createElement('tr');
    newRow.className = `${task.priority} fw-bold align-middle`
    newRow.innerHTML = `
        <th scope="row">${taskNum+1}</th>
        <td>
            <div class="position-relative task">${task.title}
                <div class="position-absolute infoCloud">  
                    <span class="text-dark-emphasis">Info:</span> ${task.info} 
                </div>
            </div>
        </td>
        <td>${task.date.toDateString().replace(' ',', ')}</td>
        <td><button class="btn btn-outline-${task.priority} remove">Remove</button></td>
        `;
    taskList.appendChild(newRow);
    formToggle()
    showAlert('Task added succesfully','success');
}
// function to clear input fields after submiting form
function clearFields(){
    document.querySelector('#myTask').value = '';
    document.querySelector('#taskDate').value = '';
    document.querySelector('#priority').value = '';
    document.querySelector('#addInfo').value = '';
}
// selecting task list and adding events for completion
document.querySelector('#taskList').addEventListener('click',removeTask);
// function to remove task
function removeTask(event){
    if (event.target.classList.contains('remove')){
        // are you sure? message before removing
        event.target.parentElement.parentElement.remove();
        showAlert('Task removed successfully','danger');
    }
}
// display of the hovering info block
document.querySelector('#taskList').addEventListener('mouseover',infoDisplayAdd);
document.querySelector('#taskList').addEventListener('mouseout',infoDisplayRemove);

// display info
function infoDisplayAdd(e){
    if (e.target.classList.contains('task')){
        e.target.lastElementChild.style.display = 'inline-block'
    }
}

// remove info
function infoDisplayRemove(e){
    if (e.target.classList.contains('task')){
        e.target.lastElementChild.style.display = 'none'
    }
}

// alert message of adding and removing task
function showAlert(message,type){
    let div = document.createElement('div');
    div.className = `alert alert-${type} fw-bold border-3`;
    div.textContent = message;
    const container = document.querySelector('#taskTable');
    const table = document.querySelector('#taskTable > table');
    container.insertBefore(div,table);
    // removeing div
    setTimeout(() => document.querySelector('.alert').remove(),2500 )
}

// add info division as a cloud table and display info about the task if it's hovered upon --Done
// add date in a more readable way --Done
// make add task like a popup window (use z-index) -- couldn't blur background
// add a div transition for successfull removal and addition of the tasks (Use setTimeOut) -- Done
// find how to add edit button to edit a written task 
// sort the tasks with their due date and than with priority when Due-Date is clicked on it
// remove serial no or add it in a way that there are no errors 
// add and remove from local storage (how to store without id's for removal and retriving data) 
// add button for dark mode