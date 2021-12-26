import React from "react";
import "./App.css";
import { Home } from "./home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./login/Login";
import { Register } from "./register/Register";
import { AuthenticateProvider } from "./providers/AuthenticateProvider";
import { Dashboard } from "./dashboard/Dashboard";
import { PrivateRoute } from "./private-route/PrivateRoute";
import { Logout } from "./logout/Logout";
import { NoAuthRoute } from "./no-auth-route/NoAuthRoute";
import { RegisterAdmin } from "./register-admin/RegisterAdmin";
import { AdminDashboard } from "./dashboard-admin/AdminDashboard";
import { Role } from "./types/role";
import { UserDetails } from "./user-details/UserDetails";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthenticateProvider>
        <Router>
          <div className="App">
            <Logout />
            <Switch>
              <NoAuthRoute path="/login">
                <Login />
              </NoAuthRoute>
              <NoAuthRoute path="/register">
                <Register />
              </NoAuthRoute>
              <NoAuthRoute path="/register-admin">
                <RegisterAdmin />
              </NoAuthRoute>
              <PrivateRoute path="/dashboard" role={Role.USER}>
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/admin-dashboard" role={Role.ADMIN}>
                <AdminDashboard />
              </PrivateRoute>
              <PrivateRoute path="/user-details/:userName" role={Role.ADMIN}>
                <UserDetails />
              </PrivateRoute>
              <NoAuthRoute path="/">
                <Home />
              </NoAuthRoute>
            </Switch>
          </div>
        </Router>
      </AuthenticateProvider>
    </ThemeProvider>
  );
}

export default App;
