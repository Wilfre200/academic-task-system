import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      await api.post("/tasks", {
        title,
        description,
        userId: Number(userId),
      });

      setTitle("");
      setDescription("");
      setUserId("");

      loadTasks();

      alert("Tarea creada");
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`, {
        title,
        description,
      });

      setEditingId(null);

      setTitle("");
      setDescription("");
      setUserId("");

      loadTasks();

      alert("Tarea actualizada");
    } catch (error) {
      console.error(error);
    }
  };

  const completeTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`, {
        completed: true,
      });

      loadTasks();

      alert("Tarea completada");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Error al completar tarea"
      );
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("¿Eliminar tarea?")) {
      return;
    }

    try {
      await api.delete(`/tasks/${id}`);

      loadTasks();

      alert("Tarea eliminada");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow mb-4">

          <div className="card-header bg-success text-white">
            <h3 className="mb-0">
              Gestión de Tareas
            </h3>
          </div>

          <div className="card-body">

            <div className="row">

              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="Título"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="ID Usuario"
                  value={userId}
                  onChange={(e) =>
                    setUserId(e.target.value)
                  }
                />
              </div>

            </div>

            {editingId ? (
              <button
                className="btn btn-warning"
                onClick={() =>
                  updateTask(editingId)
                }
              >
                Actualizar Tarea
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={createTask}
              >
                Crear Tarea
              </button>
            )}

          </div>

        </div>

        <div className="card shadow">

          <div className="card-header">
            <h4 className="mb-0">
              Lista de Tareas
            </h4>
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-striped table-hover">

             <thead className="table-dark">
  <tr>
    <th>Título</th>
    <th>Descripción</th>
    <th>Estado</th>
    <th>Usuario</th>
    <th>Creada</th>
    <th>Actualizada</th>
    <th>Acciones</th>
  </tr>
</thead>

                <tbody>

                  {tasks.map((task) => (
                    <tr key={task.id}>

  <td>{task.title}</td>

  <td>{task.description}</td>

  <td>
    {task.completed ? (
      <span className="badge bg-success">
        Completada
      </span>
    ) : (
      <span className="badge bg-warning text-dark">
        Pendiente
      </span>
    )}
  </td>

  <td>{task.user?.name}</td>

<td>
  {new Date(task.createdAt)
    .toLocaleString("es-DO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}
</td>

<td>
  {task.createdAt !== task.updatedAt
    ? new Date(task.updatedAt)
        .toLocaleString("es-DO", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
    : "Sin actualizar"}
</td>

  <td>

    <button
      className="btn btn-primary btn-sm me-2"
      onClick={() => {

        setEditingId(task.id);

        setTitle(task.title);

        setDescription(
          task.description
        );

        setUserId(task.userId);

      }}
    >
      Editar
    </button>

    {!task.completed && (
      <button
        className="btn btn-success btn-sm me-2"
        onClick={() =>
          completeTask(task.id)
        }
      >
        Completar
      </button>
    )}

    <button
      className="btn btn-danger btn-sm"
      onClick={() =>
        deleteTask(task.id)
      }
    >
      Eliminar
    </button>

  </td>

</tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Tasks;