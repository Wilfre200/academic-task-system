import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(response.data.access_token);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Error al iniciar sesión"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div
        className="card shadow-lg"
        style={{
          width: "400px",
          borderRadius: "15px",
        }}
      >
        <div className="card-body p-4">

          <div className="text-center mb-4">
            <h2 className="fw-bold">
              Academic Task System
            </h2>

            <p className="text-muted">
              Inicia sesión para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label">
                Correo electrónico
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Contraseña
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Ingresando..."
                : "Iniciar sesión"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;