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
      const response = await fetch("https://tarea-backend-3.onrender.com/tasks");  // Aquí cambias la URL local por la de Render
      const result = await response.json();
      setTasks(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Función para agregar una tarea
  const addTask = async () => {
    const newTask = { title, description };

    try {
      const response = await fetch("https://tarea-backend-3.onrender.com/tasks", {  // Aquí también usas la URL de Render
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const addedTask = await response.json();
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
      await fetch(`https://tarea-backend-3.onrender.com/tasks/${id}`, {  // Aquí también se usa la URL de Render
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));  // Actualizar el estado
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
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
