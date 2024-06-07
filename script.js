document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('newTaskForm');
    const taskList = document.getElementById('tasks');
    const taskDetail = document.getElementById('taskDetail');
    const taskDetailTitle = document.getElementById('taskDetailTitle');
    const taskDetailDescription = document.getElementById('taskDetailDescription');
    const taskDetailDueDate = document.getElementById('taskDetailDueDate');
    const editTaskButton = document.getElementById('editTaskButton');
    const deleteTaskButton = document.getElementById('deleteTaskButton');
    const submitButton = document.getElementById('submitButton');
    let tasks = [];
    let currentTask = null;

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const dueDate = e.target.dueDate.value;

        if (currentTask) {
            currentTask.title = title;
            currentTask.description = description;
            currentTask.dueDate = dueDate;
            updateTask(currentTask);
        } else {
            const task = { id: Date.now(), title, description, dueDate };
            addTask(task);
        }
        taskForm.reset();
        hideTaskDetail();
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') {
            const taskId = e.target.closest('li').getAttribute('data-id');
            currentTask = tasks.find(task => task.id == taskId);
            showTaskDetail(currentTask);
        }
    });

    editTaskButton.addEventListener('click', () => {
        if (currentTask) {
            taskForm.title.value = currentTask.title;
            taskForm.description.value = currentTask.description;
            taskForm.dueDate.value = currentTask.dueDate;
            submitButton.textContent = "Update Task";
        }
    });

    deleteTaskButton.addEventListener('click', () => {
        if (currentTask) {
            deleteTask(currentTask.id);
            currentTask = null;
            hideTaskDetail();
        }
    });

    function renderTasks() {
        taskList.innerHTML = tasks.map(task => `
            <li data-id="${task.id}">
                <span>${task.title} - ${task.dueDate}</span>
            </li>
        `).join('');
    }

    function addTask(task) {
        tasks.push(task);
        renderTasks();
    }

    function updateTask(updatedTask) {
        tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id != id);
        renderTasks();
    }

    function showTaskDetail(task) {
        taskDetailTitle.textContent = `Title: ${task.title}`;
        taskDetailDescription.textContent = `Description: ${task.description}`;
        taskDetailDueDate.textContent = `Due Date: ${task.dueDate}`;
        taskDetail.classList.remove('hidden');
    }

    function hideTaskDetail() {
        taskDetail.classList.add('hidden');
        taskDetailTitle.textContent = '';
        taskDetailDescription.textContent = '';
        taskDetailDueDate.textContent = '';
        submitButton.textContent = "Add Task";
    }
});
