import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      await api.post("/users", {
        name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");

      loadUsers();

      alert("Usuario creado");
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (id) => {
    try {
      await api.put(`/users/${id}`, {
        name,
        email,
      });

      setEditingId(null);

      setName("");
      setEmail("");
      setPassword("");

      loadUsers();

      alert("Usuario actualizado");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) {
      return;
    }

    try {
      await api.delete(`/users/${id}`);
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (

  <>

    <Navbar />

    <div className="container mt-4">

      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Gestión de Usuarios</h3>
        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-4 mb-3">
              <input
                className="form-control"
                placeholder="Nombre"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

          </div>

          {editingId ? (
            <button
              className="btn btn-warning"
              onClick={() =>
                updateUser(editingId)
              }
            >
              Actualizar Usuario
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={createUser}
            >
              Crear Usuario
            </button>
          )}

        </div>
      </div>

      <div className="card shadow">

        <div className="card-header">
          <h4 className="mb-0">
            Lista de Usuarios
          </h4>
        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-striped table-hover">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (
                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>
                      <span className="badge bg-info">
                        {user.role}
                      </span>
                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => {
                          setEditingId(user.id);
                          setName(user.name);
                          setEmail(user.email);
                        }}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteUser(user.id)
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

export default Users;