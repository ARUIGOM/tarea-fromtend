import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Obtener las tareas del backend
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para obtener las tareas
  const fetchTasks = async () => {
    try {
      console.log("Haciendo petición GET a /tasks..."); // Depuración
      const response = await fetch("https://tarea-backend-3.onrender.com/tasks");  // Ruta del backend en Render
      console.log("Respuesta recibida:", response); // Depuración
      if (!response.ok) {
        throw new Error("Error al obtener las tareas");
      }
      const result = await response.json();
      console.log("Tareas obtenidas:", result); // Depuración
      setTasks(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Función para agregar una tarea
  const addTask = async () => {
    const newTask = { title, description };
    try {
      console.log("Haciendo petición POST a /tasks con:", newTask); // Depuración
      const response = await fetch("https://tarea-backend-3.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      console.log("Respuesta de POST:", response); // Depuración
      if (!response.ok) {
        throw new Error("Error al agregar la tarea");
      }
      const addedTask = await response.json();
      console.log("Tarea agregada:", addedTask); // Depuración
      setTasks([...tasks, addedTask]);  // Actualizar el estado de las tareas
      setTitle("");  // Limpiar el campo de título
      setDescription("");  // Limpiar el campo de descripción
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (id) => {
    try {
      console.log("Haciendo petición DELETE a /tasks/" + id); // Depuración
      const response = await fetch(`https://tarea-backend-3.onrender.com/tasks/${id}`, {
        method: "DELETE",
      });
      console.log("Respuesta DELETE:", response); // Depuración
      if (!response.ok) {
        throw new Error("Error al eliminar la tarea");
      }
      setTasks(tasks.filter((task) => task._id !== id));  // Actualizar el estado de las tareas
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Gestor de Tareas</h1>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTask}>Agregar Tarea</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => deleteTask(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
