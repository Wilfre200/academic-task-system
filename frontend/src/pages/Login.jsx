import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import {
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  useEffect(() => {
    const savedEmail =
      localStorage.getItem("email");

    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    localStorage.setItem(
      "email",
      e.target.value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response =
        await api.post("/auth/login", {
          email,
          password,
        });

      login(
        response.data.access_token
      );

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
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #0d6efd, #198754)",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{
          width: "430px",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">

          {/* LOGO */}

          <div className="text-center mb-4">

            <img
              src="/logoL.png"
              alt="Logo"
              width="120"
              className="mb-3"
            />

            <h2 className="fw-bold">
              Academic Task System
            </h2>

            <p className="text-muted">
              Sistema de gestión académica
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Correo electrónico
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaEnvelope />
                </span>

                <input
                  type="email"
                  className="form-control"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Contraseña
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="********"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* BOTON */}

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                  ></span>

                  Ingresando...
                </>
              ) : (
                <>
                  <FaSignInAlt className="me-2" />
                  Iniciar sesión
                </>
              )}
            </button>

          </form>

          <hr />

          <div className="text-center">
            <small className="text-muted">
              © 2026 Academic Task System
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;