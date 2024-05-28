document.addEventListener('DOMContentLoaded', () => {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskCategory = document.getElementById('taskCategory');
    const taskPriority = document.getElementById('taskPriority');
    const addTaskButton = document.getElementById('addTaskButton');
    const searchBar = document.getElementById('searchBar');
    const filterCategory = document.getElementById('filterCategory');
    const filterPriority = document.getElementById('filterPriority');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    addTaskButton.addEventListener('click', () => {
        const title = taskTitle.value;
        const description = taskDescription.value;
        const category = taskCategory.value;
        const priority = taskPriority.value;

        if (title && description && category && priority) {
            const task = { title, description, category, priority };
            tasks.push(task);
            taskTitle.value = '';
            taskDescription.value = '';
            taskCategory.value = '';
            taskPriority.value = '';
            displayTasks();
        }
    });

    searchBar.addEventListener('input', () => {
        displayTasks();
    });

    filterCategory.addEventListener('change', () => {
        displayTasks();
    });

    filterPriority.addEventListener('change', () => {
        displayTasks();
    });

    function displayTasks() {
        taskList.innerHTML = '';
        const searchText = searchBar.value.toLowerCase();
        const selectedCategory = filterCategory.value;
        const selectedPriority = filterPriority.value;

        const filteredTasks = tasks.filter(task => {
            return (
                (task.title.toLowerCase().includes(searchText) || task.description.toLowerCase().includes(searchText)) &&
                (selectedCategory === '' || task.category === selectedCategory) &&
                (selectedPriority === '' || task.priority === selectedPriority)
            );
        });

        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';
            taskDetails.innerHTML = `
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <p>Category: ${task.category}</p>
                <p>Priority: ${task.priority}</p>
            `;
            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                tasks = tasks.filter(t => t !== task);
                displayTasks();
            });
            taskActions.appendChild(deleteButton);
            taskItem.appendChild(taskDetails);
            taskItem.appendChild(taskActions);
            taskList.appendChild(taskItem);
        });
    }
});
