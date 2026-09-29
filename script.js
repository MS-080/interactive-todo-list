// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const taskCounter = document.getElementById("taskCounter");


// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Save tasks in localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display all tasks
function renderTasks() {

    // Clear the old list
    taskList.innerHTML = "";

    // Display every task
    tasks.map(function(task, index) {

        // Create list item
        const li = document.createElement("li");


        // Create task text
        const span = document.createElement("span");
        span.textContent = task.text;


        // If completed, cross out the text
        if (task.completed) {
            span.style.textDecoration = "line-through";
        }


        // Create Complete / Undo button
        const completeButton = document.createElement("button");

        completeButton.textContent =
            task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function() {
            toggleTask(index);
        });


        // Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });


        // Add everything to the list item
        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);


        // Add list item to task list
        taskList.appendChild(li);
    });


    // Update task counter
    taskCounter.textContent = tasks.length + " task(s)";
}


// Add a new task
function addTask() {

    const taskText = taskInput.value.trim();


    // Reject empty task
    if (taskText === "") {
        message.textContent = "Please enter a task.";
        return;
    }


    // Remove error message
    message.textContent = "";


    // Create new task
    const newTask = {
        text: taskText,
        completed: false
    };


    // Add task to array
    tasks.push(newTask);


    // Save tasks
    saveTasks();


    // Update page
    renderTasks();


    // Clear input
    taskInput.value = "";
}


// Complete / Incomplete task
function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    renderTasks();
}


// Delete a task
function deleteTask(index) {

    tasks = tasks.filter(function(task, i) {
        return i !== index;
    });

    saveTasks();

    renderTasks();
}


// Add task when button is clicked
addButton.addEventListener("click", function() {
    addTask();
});


// Add task when Enter is pressed
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Display saved tasks when page opens
renderTasks();