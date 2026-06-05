import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const { darkMode } = useTheme();

  const [usersCount, setUsersCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const usersResponse = await api.get("/users");
      const tasksResponse = await api.get("/tasks");

      const users = usersResponse.data;
      const tasks = tasksResponse.data;

      setUsersCount(users.length);
      setTasksCount(tasks.length);

      setPendingCount(
        tasks.filter(task => !task.completed).length
      );

      setCompletedCount(
        tasks.filter(task => task.completed).length
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

      <div>

      <img src="/logoL.png" alt="Logo" width={120} />

      </div>

        <div className="row">

          <div className="col-md-3 mb-3">
            <div
              className={`card shadow text-center ${
                darkMode
                  ? "bg-secondary text-light"
                  : ""
              }`}
            >
              <div className="card-body">
                <h5>Usuarios</h5>
                <h1>{usersCount}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className={`card shadow text-center ${
                darkMode
                  ? "bg-secondary text-light"
                  : ""
              }`}
            >
              <div className="card-body">
                <h5>Tareas</h5>
                <h1>{tasksCount}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className={`card shadow text-center ${
                darkMode
                  ? "bg-secondary text-light"
                  : ""
              }`}
            >
              <div className="card-body">
                <h5>Pendientes</h5>
                <h1>{pendingCount}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className={`card shadow text-center ${
                darkMode
                  ? "bg-secondary text-light"
                  : ""
              }`}
            >
              <div className="card-body">
                <h5>Completadas</h5>
                <h1>{completedCount}</h1>
              </div>
            </div>
          </div>

        </div>

        <div
          className={`card shadow mt-4 ${
            darkMode
              ? "bg-secondary text-light"
              : ""
          }`}
        >
          <div className="card-body">

            <h4>
              Bienvenido al Academic Task System
            </h4>

            <p
              className={
                darkMode
                  ? "text-light"
                  : "text-muted"
              }
            >
              Sistema de gestión académica
            </p>

          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;