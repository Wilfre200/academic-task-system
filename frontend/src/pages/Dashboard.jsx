import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

function Dashboard() {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  console.log("Usuario autenticado:", user);

  const [usersCount, setUsersCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {

  if (user) {
    loadStatistics();
  }

}, [user]);

 const loadStatistics = async () => {

  if (!user) return;

  try {

    const tasksResponse =
      await api.get("/tasks");

    const tasks =
      tasksResponse.data;

    setTasksCount(tasks.length);

    setPendingCount(
      tasks.filter(
        task => !task.completed
      ).length
    );

    setCompletedCount(
      tasks.filter(
        task => task.completed
      ).length
    );

    if (user.role === "ADMIN") {

      const usersResponse =
        await api.get("/users");

      setUsersCount(
        usersResponse.data.length
      );

    } else {

      setUsersCount(0);

    }

  } catch (error) {

    console.error(
      "Error cargando estadísticas:",
      error
    );

  }
};

  return (
    <>
      <Navbar />

      <div className="container mt-4">

      <div className="text-center mb-4">
  <img
    src="/logoL.png"
    alt="Logo"
    width={140}
  />
</div>

<div className="mb-4">
  <h2>
    Hola, {user?.name} 👋
  </h2>

  <p className="text-muted">
    Bienvenido al Academic Task System
  </p>
</div>

       <div className="row mt-4"></div>

        <div className="row">

         {user?.role === "ADMIN" && (
  <div className="col-md-3 mb-3">
    <div
      className={`card shadow text-center ${
        darkMode
          ? "bg-secondary text-light"
          : ""
      }`}
    >
      <div className="card bg-primary text-white shadow">
        <h5>Usuarios</h5>
        <h1>{usersCount}</h1>
      </div>
    </div>
  </div>
)}
          <div className="col-md-3 mb-3">
            <div
              className={`card shadow text-center ${
                darkMode
                  ? "bg-secondary text-light"
                  : ""
              }`}
            >
              <div className="card bg-info text-white shadow">
                <h5>
  {user?.role === "ADMIN"
    ? "Tareas"
    : "Mis Tareas"}
</h5>
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
              <div className="card bg-warning text-white shadow">
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
              <div className="card bg-success text-white shadow">
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
  Bienvenido, {user?.name}
</h4>

  <p
  className={
    darkMode
      ? "text-light"
      : "text-muted"
  }
>
  {user?.role === "ADMIN"
    ? "Panel de administración del sistema"
    : "Panel de gestión de tareas académicas"}
</p>

    <p className="text-muted">
  {new Date().toLocaleDateString(
    "es-DO",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )}
</p>

  <hr />

  <p>
    <strong>Correo:</strong>{" "}
    {user?.email}
  </p>

  <p>
  <strong>Rol:</strong>{" "}
  <span
    className={`badge ${
      user?.role === "ADMIN"
        ? "bg-danger"
        : "bg-primary"
    }`}
  >
    {user?.role === "ADMIN"
      ? "ADMINISTRADOR"
      : "USUARIO"}
  </span>
</p>

</div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default Dashboard;