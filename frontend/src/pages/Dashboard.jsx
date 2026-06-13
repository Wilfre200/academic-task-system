import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import {FaUsers, FaTasks, FaClock, FaCheckCircle} from "react-icons/fa";
import "../styles/Dashboard.css";

function Dashboard() {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  console.log("Usuario autenticado:", user);

  const [usersCount, setUsersCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const progress =
  tasksCount > 0
    ? Math.round(
        (completedCount / tasksCount) * 100
      )
    : 0;

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
  <div className="card stat-card users-card">
    <div className="card-body">

      <FaUsers size={40} />

      <h5 className="mt-3">
        Usuarios
      </h5>

      <h1>{usersCount}</h1>

    </div>
  </div>
</div>
)}
          <div className="col-md-3 mb-3">
  <div className="card stat-card tasks-card">
    <div className="card-body">

      <FaTasks size={40} />

      <h5 className="mt-3">
        {user?.role === "ADMIN"
          ? "Tareas"
          : "Mis Tareas"}
      </h5>

      <h1>{tasksCount}</h1>

    </div>
  </div>
</div>

          <div className="col-md-3 mb-3">
  <div className="card stat-card pending-card">
    <div className="card-body">

      <FaClock size={40} />

      <h5 className="mt-3">
        Pendientes
      </h5>

      <h1>{pendingCount}</h1>

    </div>
  </div>
</div>

          <div className="col-md-3 mb-3">
  <div className="card stat-card completed-card">
    <div className="card-body">

      <FaCheckCircle size={40} />

      <h5 className="mt-3">
        Completadas
      </h5>

      <h1>{completedCount}</h1>

    </div>
  </div>
</div>

        </div>

        <div className="card shadow mt-4">
  <div className="card-body">

    <h5>Progreso General</h5>

    <div className="progress">
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{
          width: `${progress}%`
        }}
      >
        {progress}%
      </div>
    </div>

  </div>
</div>

<div className="card shadow mt-4">
  <div className="card-body">

    <h5>Acciones rápidas</h5>

    <div className="d-flex gap-2">

      <Link
        to="/tasks"
        className="btn btn-success"
      >
        Nueva tarea
      </Link>

      {user?.role === "ADMIN" && (
        <Link
          to="/users"
          className="btn btn-primary"
        >
          Gestionar usuarios
        </Link>
      )}

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