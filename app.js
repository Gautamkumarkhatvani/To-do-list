document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks) {
        storedTasks.forEach((tasks) => tasks.push(task))
        updatestats();
    }
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        console.log(tasks);
        taskInput.value = "";
        updateTaskList();
        updatestats();
        saveTasks();
    }
};
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updatestats();
    saveTasks();

}
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updatestats();
    saveTasks();
}
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput")
    taskInput.value = tasks[index].text

    tasks.splice(index, 1)
    updateTaskList();
    updatestats();
    saveTasks();
};
const updatestats = () => {
    const completeTasks = tasks.filter(task => task.completed).length
    const totalTasks = tasks.length
    const progress = (completeTasks / totalTasks) * 100
    const ProgressBar = document.getElementById('progress')
    ProgressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
    if (tasks.length && completeTasks === totalTasks) {
        blaskConfetti();
    }
}
const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem" >
            <div class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
            <p>${task.text}</p>
            </div>
            <div class="icons">
            <img src="edit.png" alt="wait" onclick="editTask(${index})" />
            <img src="bin.png" alt="wait" onclick="deleteTask(${index})"/>
            </div>
        </div>
        `;
        listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault()

    addTask();
});

const blaskConfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}