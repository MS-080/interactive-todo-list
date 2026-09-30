export const addTask = (tasks, title) =>
    [
        ...tasks,
        {
            id: Date.now(),
            title: title,
            done: false
        }
    ];


export const toggleTask = (tasks, id) =>
    tasks.map(task =>
        task.id === id
            ? { ...task, done: !task.done }
            : task
    );


export const deleteTask = (tasks, id) =>
    tasks.filter(task => task.id !== id);


export const countDone = (tasks) =>
    tasks.reduce(
        (count, task) => task.done ? count + 1 : count,
        0
    );