import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const { darkMode, toggleTheme } =
  useTheme();

  return (
    <nav
  className={`navbar navbar-expand-lg ${
    darkMode
      ? "navbar-dark bg-dark"
      : "navbar-light bg-light"
  }`}
>
      <div className="container">

        <Link
          className="navbar-brand"
          to="/dashboard"
        >
          Academic Task System
        </Link>

        <div className="navbar-nav">

          <Link
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className="nav-link"
            to="/users"
          >
            Usuarios
          </Link>

          <Link
            className="nav-link"
            to="/tasks"
          >
            Tareas
          </Link>

        </div>

      <div className="d-flex gap-2">

  <button
    className="btn btn-warning"
    onClick={toggleTheme}
  >
    {darkMode ? "🌞 Claro" : "🌙 Oscuro"}
  </button>

  <button
    className={`btn ${
      darkMode
        ? "btn-outline-light"
        : "btn-outline-dark"
    }`}
    onClick={handleLogout}
  >
    Cerrar sesión
  </button>

</div>

      </div>

    </nav>
  );
}

export default Navbar;