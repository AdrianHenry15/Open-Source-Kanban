
const taskIdCounter = 0;

const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");
const pageContentEl = document.querySelector("#page-content");

// create array to hold tasks for saving
const tasks = [];

const taskFormHandler = function (event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-title']").value;
    let taskTypeInput = document.querySelector("input[name='task-content']").value;

    // check if inputs are empty (validate)
    if (taskNameInput === "" || taskTypeInput === "") {
        alert("You need to fill out the task form!");
        return false;
    }

    // reset form fields for next task to be entered
    document.querySelector("input[name='task-title']").value = "";
    document.querySelector("input[name='task-content']").selectedIndex = 0;

    // check if task is new or one being edited by seeing if it has a data-task-id attribute
    let isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "new ideas"
        };

        createTaskEl(taskDataObj);
    }
};

const createTaskEl = function (taskDataObj) {
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML =
        "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // is not a select drop down anymore 
    switch (taskDataObj.status) {
        case "new ideas":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.append(listItemEl);
            break;
        case "lets collaborate":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.append(listItemEl);
            break;
        case "old ideas":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.append(listItemEl);
            break;
        default:
            console.log("Something went wrong!");
    }

    // save task as an object with name, type, status, and id properties then push it into tasks array
    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    // save tasks to localStorage
    saveTasks();

    // increase task counter for next unique id
    taskIdCounter++;
};

// create comment button
const createTaskActions = function (taskId) {
    // create container to hold elements
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    // create delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
    // create change status dropdown
    let statusSelectEl = document.createElement("select");
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    statusSelectEl.className = "select-status";
    actionContainerEl.appendChild(statusSelectEl);
    // create status options
    let statusChoices = ["New Ideas", "Lets Collaborate", "Old Ideas"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        let statusOptionEl = document.createElement("option");
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusOptionEl.textContent = statusChoices[i];

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

let completeEditTask = function (taskName, taskType, taskId) {
    // find task list item with taskId value
    let taskSelected = document.querySelector(
        ".task-item[data-task-id='" + taskId + "']"
    );

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }


    alert("Task Updated!");

    // remove data attribute from form
    formEl.removeAttribute("data-task-id");
    // update formEl button to go back to saying "Add Task" instead of "Edit Task"
    formEl.querySelector("#save-task").textContent = "Add Task";
    // save tasks to localStorage
    saveTasks();
};

const taskButtonHandler = function (event) {
    // get target element from event
    let targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } else if (targetEl.matches(".delete-btn")) {
        console.log("delete", targetEl);
        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

const taskStatusChangeHandler = function (event) {
    console.log(event.target.value);

    // find task list item based on event.target's data-task-id attribute
    let taskId = event.target.getAttribute("data-task-id");

    let taskSelected = document.querySelector(
        ".task-item[data-task-id='" + taskId + "']"
    );

    // convert value to lower case
    let statusValue = event.target.value.toLowerCase();

    if (statusValue === "new ideas") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "lets collaborate") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "old ideas") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === pasrseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }

    // save to localStorage
    saveTasks();
};



const editTask = function (taskId) {
    console.log(taskId);

    // get task list item element
    let taskSelected = document.querySelector(
        ".task-item[data-task-id='" + taskId + "']"
    );

    // get content from task name and type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    let taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    // write values of taskname and taskType to form to be edited
    document.querySelector("input[name='task-title']").value = taskTitle;
    document.querySelector("input[name='task-content']").value = taskContent;

    // set data attribute to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id", taskId);
    // update form's button to reflect editing a task rather than creating a new one
    formEl.querySelector("#save-task").textContent = "Save Task";
};

const deleteTask = function (taskId) {
    console.log(taskId);
    // find task list element with taskId value and remove it
    let taskSelected = document.querySelector(
        ".task-item[data-task-id='" + taskId + "']"
    );
    taskSelected.remove();

    // create new array to hold updated list of tasks
    let updatedTaskArr = [];

    // loop through current tasks
    for (let i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
};

const saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = function (taskDataObj) {
    let savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) {
        tasks = [];
        return false;
    }
    console.log("Saved tasks found!")
    // else load up saved tasks

    // parse into array of objects
    savedTasks = JSON.parse(savedTasks);

    // loop through savedTasks array
    for (let i = 0; i < savedTasks.length; i++) {
        // pass each task object into the 'createTaskEl()' function
        createTaskEl(savedTasks[i]);
    }
};

// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();