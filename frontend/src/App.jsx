import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./routes/PrivateRoute";

import Tasks from "./pages/Tasks";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
  path="/users"
  element={
    <PrivateRoute>
      <Users />
    </PrivateRoute>
  }
      />

      <Route
  path="/tasks"
  element={
    <PrivateRoute>
      <Tasks />
    </PrivateRoute>
  }
/>

    </Routes>

    
  );
}

export default App;