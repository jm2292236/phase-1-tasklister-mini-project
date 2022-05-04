// =============================
// ========= Selectors =========
// =============================
const form = document.querySelector("form");
const todoList = document.querySelector("#todo-list");
const todoInput = document.getElementById("new-task-description");
const filterTodo = document.querySelector(".filter-todo");

// ===================================
// ========= Event Listeners =========
// ===================================
document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (todoInput.value) {
            buildTodoList();
            form.reset();
            todoInput.focus();
        }
    })
});

// Listener for the whole todo list and later the function checks which button was clicked
todoList.addEventListener("click", clickOnTodo);

// Listener for the select that filters the todos
filterTodo.addEventListener("click", filterTasks);


// =============================
// ========= Functions =========
// =============================
function buildTodoList() {
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Todo item (li item)
    const newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Check mark (completed task)
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    
    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    // Filter the tasks in case there is a filter already applied
    filterTasks();
}

// Check which button was clicked on the todo list
function clickOnTodo(e) {
    const item = e.target;

    if (item.classList[0] === "completed-btn") {
        // Click on the comppleted button
        item.parentElement.classList.toggle("completed");

        // Filter the tasks in case there is a filter already applied
        filterTasks();
    }
    else if (item.classList[0] === "trash-btn") {
        // Click on the trash button
        item.parentElement.classList.add("fall");

        // Wait for the animation to finish
        item.parentElement.addEventListener("transitionend", () => item.parentElement.remove());
    }
}

// Filter the tasks by All - Completed - Uncompleted
function filterTasks () {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        const style = todo.style;
        if (style != undefined && style != null)
        switch(document.querySelector(".filter-todo").value) {
            case "all":
                style.display = "flex";
                break;
            case "completed": 
                if (todo.classList.contains("completed")) 
                    style.display = "flex"
                else style.display = "none";
                break;
            case "uncompleted": 
                if (!todo.classList.contains("completed")) 
                    style.display = "flex"
                else style.display = "none";
                break;
        }
    });
}
