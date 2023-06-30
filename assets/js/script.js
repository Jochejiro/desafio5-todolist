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
    html += `<tr>
                <td>${task.id}</td>
                <td>${task.taskName}</td>
                <td><button onclick="changeStatusTask(${task.id})">${
      task.estado
        ? '<i class="bi bi-clipboard-check-fill"></i>'
        : '<i class="bi bi-clipboard-fill"></i>'
    }</button></td>
                <td><button onclick="deleteTask(${
                  task.id
                })"><i class="bi bi-trash-fill"></i></button></td>
            </tr>`;
  });

  document.getElementById('task-list').innerHTML = html;
  document.getElementById('task-total').innerHTML = taskList.length;
  document.getElementById('task-closed').innerHTML = taskList.filter((task) => task.estado == true).length;
};

// FUNCION QUE CAMBIA EL ESTADO DE LA TAREA
const changeStatusTask = (id) => {
  taskList.forEach((task) =>
    task.id === id
      ? (task.estado = !task.estado)
      : console.log('Error al cambiar el estado 😥')
  );

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

// FUNCION QUE GENERA UNA NUEVA TAREA
document.getElementById('btn-newtask').addEventListener('click', () => {
  const newTask = document.getElementById('input-newtask');
  
  if (newTask.value) {
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
    newTask.placeholder = 'No puede estar vacio!';
  }
});

// FUNCION QUE ME GENERA ID
const generarId = (taskList) => {
  return taskList.length ? taskList[taskList.length - 1].id + 1 : 1;
};

// FUNCION QUE AL HACER CLICK EN EL INPUT REMUEVE EL ERROR
document.getElementById('input-newtask').addEventListener('click', (element) => {
  element.target.classList.remove('is-invalid');
  element.target.placeholder = '';
});

renderizarTaskList(taskList);
