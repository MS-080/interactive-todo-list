const KEY = "tasks";


// Save tasks in localStorage
export function save(tasks) {
    localStorage.setItem(KEY, JSON.stringify(tasks));
}


// Load tasks from localStorage
export function load() {

    const raw = localStorage.getItem(KEY);

    try {
        return JSON.parse(raw) || [];
    }

    catch (error) {
        console.warn("Bad saved data, starting fresh", error);
        return [];
    }
}