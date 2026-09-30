import { countDone } from "./tasks.js";


// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const message = document.getElementById("message");


// Display all tasks
export function renderTasks(tasks, onToggle, onDelete) {

    // Clear old list
    taskList.innerHTML = "";

    tasks.map(function(task) {

        // Create list item
        const li = document.createElement("li");


        // Create task text
        const span = document.createElement("span");
        span.textContent = task.title;


        // Cross out completed tasks
        if (task.done) {
            span.style.textDecoration = "line-through";
        }


        // Create Complete / Undo button
        const completeButton = document.createElement("button");

        completeButton.textContent =
            task.done ? "Undo" : "Complete";

        completeButton.addEventListener("click", function() {
            onToggle(task.id);
        });


        // Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            onDelete(task.id);
        });


        // Add elements to li
        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);


        // Add li to task list
        taskList.appendChild(li);
    });


    // Count completed tasks
    const doneCount = countDone(tasks);

    taskCounter.textContent =
        doneCount + " of " + tasks.length + " done";
}


// Get input text
export function getInputValue() {
    return taskInput.value.trim();
}


// Clear input
export function clearInput() {
    taskInput.value = "";
}


// Show error message
export function showMessage(text) {
    message.textContent = text;
}


// Set event listeners
export function setupListeners(onAdd) {

    addButton.addEventListener("click", function() {
        onAdd();
    });


    taskInput.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            onAdd();
        }

    });
}