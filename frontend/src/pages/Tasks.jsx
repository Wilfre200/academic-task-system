import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Tasks() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  // comentarios por tarea
  const [comments, setComments] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const [editingId, setEditingId] = useState(null);

  // ======================
  // LOAD DATA
  // ======================
  const loadTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();

    if (user?.role === "ADMIN") {
      loadUsers();
    }
  }, [user]);

  // ======================
  // CRUD TASKS
  // ======================
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
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("¿Eliminar tarea?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // COMENTARIOS
  // ======================
  const addComment = async (taskId) => {
    try {
      await api.post(`/tasks/${taskId}/comments`, {
        text: comments[taskId],
      });

      setComments({
        ...comments,
        [taskId]: "",
      });

      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        {/* FORM */}
        <div className="card shadow mb-4">
          <div className="card-header bg-success text-white">
            <h3 className="mb-0">Gestión de Tareas</h3>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                {user?.role === "ADMIN" && (
                  <select
                    className="form-select"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  >
                    <option value="">Seleccionar usuario</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {editingId ? (
              <button
                className="btn btn-warning"
                onClick={() => updateTask(editingId)}
              >
                Actualizar Tarea
              </button>
            ) : (
              <button className="btn btn-success" onClick={createTask}>
                Crear Tarea
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="card shadow">
          <div className="card-header">
            <h4 className="mb-0">Lista de Tareas</h4>
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
                        {new Date(task.createdAt).toLocaleDateString("es-DO")}
                      </td>

                      <td>
                        {task.createdAt !== task.updatedAt
                          ? new Date(task.updatedAt).toLocaleDateString("es-DO")
                          : "Sin actualizar"}
                      </td>

                      <td>
                        {/* EDITAR SOLO ADMIN */}
                        {user?.role === "ADMIN" && (
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => {
                              setEditingId(task.id);
                              setTitle(task.title);
                              setDescription(task.description);
                              setUserId(task.userId);
                            }}
                          >
                            Editar
                          </button>
                        )}

                        {/* COMPLETAR TODOS */}
                        {!task.completed && (
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => completeTask(task.id)}
                          >
                            Completar
                          </button>
                        )}

                        {/* ELIMINAR SOLO ADMIN */}
                        {user?.role === "ADMIN" && (
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => deleteTask(task.id)}
                          >
                            Eliminar
                          </button>
                        )}

                        {/* INPUT COMENTARIO POR TAREA */}
                        <input
                          className="form-control mb-2"
                          placeholder="Escribe un comentario"
                          value={comments[task.id] || ""}
                          onChange={(e) =>
                            setComments({
                              ...comments,
                              [task.id]: e.target.value,
                            })
                          }
                        />

                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() => addComment(task.id)}
                        >
                          Comentar
                        </button>

                        {/* MOSTRAR COMENTARIOS */}
                        <div className="mt-2">
                          {task.comments?.map((c) => (
                            <div
                              key={c.id}
                              className="border rounded p-1 mb-1"
                            >
                              <strong>{c.user?.name}:</strong>{" "}
                              <span>{c.text}</span>
                            </div>
                          ))}
                        </div>
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