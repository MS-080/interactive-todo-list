// Import task functions
import {
    addTask,
    toggleTask,
    deleteTask
} from "./tasks.js";


// Import storage functions
import {
    save,
    load
} from "./storage.js";


// Import DOM functions
import {
    renderTasks,
    getInputValue,
    clearInput,
    showMessage,
    setupListeners
} from "./render.js";


// Load saved tasks
let tasks = load();


// Update tasks
function update(nextTasks) {

    tasks = nextTasks;

    save(tasks);

    renderTasks(tasks, handleToggle, handleDelete);
}


// Add task
function handleAdd() {

    const title = getInputValue();


    // Reject empty task
    if (title === "") {
        showMessage("Please enter a task.");
        return;
    }


    showMessage("");


    const nextTasks = addTask(tasks, title);

    update(nextTasks);

    clearInput();
}


// Toggle task
function handleToggle(id) {

    const nextTasks = toggleTask(tasks, id);

    update(nextTasks);
}


// Delete task
function handleDelete(id) {

    const nextTasks = deleteTask(tasks, id);

    update(nextTasks);
}


// Set button and keyboard listeners
setupListeners(handleAdd);


// Display tasks when app starts
renderTasks(tasks, handleToggle, handleDelete);