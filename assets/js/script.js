// ARREGLO DE INICIO
let taskList = [
  { id: 1, taskName: 'Viajar a la Gran Muralla China', estado: true },
  { id: 2, taskName: 'Viajar a Machu Picchu', estado: true },
  { id: 3, taskName: 'Viajar a Taj Mahal', estado: false },
];

// FUNCION QUE RENDERIZA EN EL HTML
const renderizarTaskList = (taskList) => {
  let html = '';

  taskList.forEach((task) => {

    const statusBtnIcon = task.estado ? 'bi-clipboard-check-fill' : 'bi-clipboard-fill';
    html += `<tr>
                <td>${task.id}</td>
                <td>${task.taskName}</td>
                <td><button onclick="changeStatusTask(${task.id})"><i class="${statusBtnIcon}"></i></button></td>
                <td><button onclick="deleteTask(${task.id})"><i class="bi bi-trash-fill"></i></button></td>
            </tr>`;
  });

  document.getElementById('task-list').innerHTML = html;
  document.getElementById('task-total').innerHTML = taskList.length;
  document.getElementById('task-closed').innerHTML = taskList.filter((task) => task.estado === true).length;
};

// FUNCION QUE CAMBIA EL ESTADO DE LA TAREA
const changeStatusTask = (id) => {

  const task = taskList.find((task) => task.id === id);
  
  if (task) {
    task.estado = !task.estado;
  } else {
    console.log('Error al cambiar el estado de la tarea 😥');
  }

  renderizarTaskList(taskList);
};

// FUNCION QUE ELIMINA UNA TAREA
const deleteTask = (id) => {
  const index = taskList.findIndex((task) => task.id === id);

  if (index != -1) {
    taskList.splice(index, 1);
  } else {
    console.log('Error al borrar 😥');
  }

  renderizarTaskList(taskList);
};

// FUNCION QUE ME GENERA ID
const generarId = (taskList) => {
  return taskList.length ? taskList[taskList.length - 1].id + 1 : 1;
};

// EVENTO QUE GENERA UNA NUEVA TAREA Y LA CARGA AL ARRAY
document.getElementById('btn-newtask').addEventListener('click', () => {
  const newTask = document.getElementById('input-newtask');
  
  if (newTask.value.trim() !== '') {
    const task = {
      id: generarId(taskList),
      taskName: newTask.value,
      estado: false,
    };
    
    taskList.push(task);
    renderizarTaskList(taskList);
    newTask.value = '';

  } else {
    newTask.classList.add('is-invalid');
  }
});

// EVENTO QUE AL HACER CLICK EN EL INPUT REMUEVE EL ERROR
document.getElementById('input-newtask').addEventListener('click', (inputNewTask) => {
  inputNewTask.target.classList.remove('is-invalid');
});

// RENDERIZA LA LISTA DE TAREAS INICIAL
renderizarTaskList(taskList);
