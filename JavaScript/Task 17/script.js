const createTaskBtn = document.querySelector('.btn-primary');
const createTaskModal = document.getElementById('createTaskModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const createTaskForm = document.querySelector('#createTaskForm')
const allTasks = document.getElementById('all-tasks')
const pendingTasks = document.getElementById('pending-tasks')
const completedTasks = document.getElementById('completed-tasks')
const taskList = document.querySelector('.task-list')
const clearAll = document.getElementById('btnClearAll') 
const searchInput = document.querySelector('.search-input')
const categoryFilter = document.getElementById('categoryFilter')
const btnTheme = document.querySelector('.btn-theme')
const themeIcon = document.querySelector('.btn-theme i')

let taskArr = []

if (localStorage.getItem('tasks')) {
    taskArr = JSON.parse(localStorage.getItem('tasks'));
    taskArr.forEach(t => { if (!t.id) t.id = Date.now() + Math.random(); });
};

if (localStorage.getItem('theme')) {
    const savedTheme = localStorage.getItem('theme');
    document.body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    }
}

if (taskArr.length > 0) {
    renderTask(taskArr)
    updateStats()
};

searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

function renderTask(taskArr) {
    taskList.innerHTML = `<div class="table-header">
                <div class="col-checkbox">
                    <input type="checkbox" class="custom-checkbox" class="complete-all-task" checked>
                </div>
                <div class="col-name">Task Name</div>
                <div class="col-category">Task Category</div>
                <div class="col-actions"></div>
            </div>`

    for (let i = 0; i < taskArr.length; i++) {
        // Create Elements
        const row = document.createElement("div");
        const colCheckbox = document.createElement("div");
        const checkbox = document.createElement("input");
        const colName = document.createElement("div");
        const colCategory = document.createElement("div");
        const colActions = document.createElement("div");
        const editBtn = document.createElement("button");
        const editIcon = document.createElement("i");
        const deleteBtn = document.createElement("button");
        const deleteIcon = document.createElement("i");

        // Add Classes
        row.classList.add("table-row");
        colCheckbox.classList.add("col-checkbox");
        checkbox.classList.add("custom-checkbox");
        colName.classList.add("col-name");
        colCategory.classList.add("col-category");
        colActions.classList.add("col-actions");
        editBtn.classList.add("btn", "btn-edit");
        editIcon.classList.add("bx", "bx-edit-alt");
        deleteBtn.classList.add("btn", "btn-delete");
        deleteIcon.classList.add("bx", "bx-trash");

        // Add Attributes & Content
        row.setAttribute('data-id', taskArr[i].id);
        checkbox.type = "checkbox";
        colName.appendChild(document.createTextNode(taskArr[i].taskName));
        colCategory.appendChild(document.createTextNode(taskArr[i].taskCategory));
        editBtn.appendChild(document.createTextNode(" Edit"));
        deleteBtn.appendChild(document.createTextNode(" Delete"));

        // Append Children
        editBtn.prepend(editIcon);
        deleteBtn.prepend(deleteIcon);
        colCheckbox.appendChild(checkbox);
        colActions.appendChild(editBtn);
        colActions.appendChild(deleteBtn);
        row.appendChild(colCheckbox);
        row.appendChild(colName);
        row.appendChild(colCategory);
        row.appendChild(colActions);

        if (taskArr[i].status === 'completed') {
            checkbox.checked = true;
            row.style.textDecoration = 'line-through';
            row.style.opacity = '0.6';
        } else {
            checkbox.checked = false;
        }

        document.querySelector(".task-list").appendChild(row);
    }
};

taskList.addEventListener('click', (e) => {
    const row = e.target.closest('.table-row');
    if (!row) return;

    const taskId = Number(row.getAttribute('data-id'));
    const task = taskArr.find(t => t.id === taskId);
    if (!task) return;

    if (e.target.closest('.btn-delete')) {
        row.remove();
        deleteTask(task);
    }

    if (e.target.closest('.btn-edit')) {
        editTask(task);
    }

    if (e.target.classList.contains('custom-checkbox')) {
        const isChecked = e.target.checked;
        task.status = isChecked ? 'completed' : 'pending';

        if (isChecked) {
            row.style.textDecoration = 'line-through';
            row.style.opacity = '0.6';

            const sparkle = document.createElement('span');
            sparkle.innerText = '✨ ';
            row.querySelector('.col-name').before(sparkle);

            const msg = document.createElement('div');
            msg.innerText = 'Task Completed!';
            msg.style.color = '#10b981';
            msg.style.fontSize = '0.8rem';
            msg.style.paddingLeft = '1rem';
            row.after(msg);

            const doneLabel = document.createElement('div');
            doneLabel.className = 'col-category';
            doneLabel.innerText = 'Done ✓';
            doneLabel.style.color = '#10b981';
            doneLabel.style.fontWeight = 'bold';
            row.querySelector('.col-category').replaceWith(doneLabel);

            setTimeout(() => {
                msg.remove();
            }, 2000);

        } else {
            renderTask(taskArr);
        }

        localStorage.setItem('tasks', JSON.stringify(taskArr));
        updateStats();
    }
});

function updateStats() {
    allTasks.innerText = taskArr.length
    pendingTasks.innerText = taskArr.filter(t => t.status === 'pending').length;
    completedTasks.innerText = taskArr.filter(t => t.status === 'completed').length;
};

function deleteTask(task) {
    const index = taskArr.indexOf(task);
    taskArr.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskArr));
    searchInput.value = ''
    renderTask(taskArr);
    updateStats();
};

function editTask(task) {
    createTaskModal.style.display = "flex";
    taskTitle.value = task.taskName;
    taskCategory.value = task.taskCategory;
    document.querySelector(".model-text").innerText = "Edit Task";
    const submitBtn = createTaskForm.querySelector(".btn-submit");
    submitBtn.onclick = (e) => {
        e.preventDefault();
        task.taskName = taskTitle.value;
        task.taskCategory = taskCategory.value;
        localStorage.setItem("tasks", JSON.stringify(taskArr));
        searchInput.value = "";
        renderTask(taskArr);
        updateStats();
        closeEditModal();
    };
    closeModalBtn.onclick = closeEditModal;
    function closeEditModal() {
        createTaskModal.style.display = "none";
        createTaskForm.reset();
        document.querySelector(".model-text").innerText = "Create Task";
        submitBtn.onclick = null;
    }
}

function applyFilters() {
    let searchValue = searchInput.value.toLowerCase().trim();
    let selectedCategory = categoryFilter.value;

    let filteredTasks = taskArr.filter((t) => {
        let matchesSearch = true;
        if (searchValue !== '') {
            matchesSearch = t.taskName.toLowerCase().includes(searchValue) ||
                t.taskCategory.toLowerCase().includes(searchValue);
        }
        let matchesCategory = true;
        if (selectedCategory !== "All") {
            matchesCategory = (t.taskCategory === selectedCategory);
        }
        return matchesSearch && matchesCategory;
    });
    renderTask(filteredTasks);
}

createTaskBtn.addEventListener('click', () => {
    createTaskModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    createTaskModal.style.display = 'none';
});

createTaskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskName = e.target[0].value
    const taskCategory = e.target[1].value
    if (taskName.trim() === '' || taskCategory.trim() === '') {
        alert('Please fill all the fields')
        return;
    }
    let taskObj = {
        id: Date.now(),
        taskName,
        taskCategory,
        status: "pending"
    }
    taskArr.push(taskObj)
    localStorage.setItem('tasks', JSON.stringify(taskArr));
    createTaskForm.reset()
    createTaskModal.style.display = 'none';
    renderTask(taskArr)
    updateStats()

});

clearAll.addEventListener('click', () => {
    taskArr = []
    localStorage.setItem('tasks', JSON.stringify(taskArr))
    renderTask(taskArr)
    updateStats()
});

btnTheme.addEventListener('click', () => {
    if (themeIcon.classList.contains('bx-sun')) {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});