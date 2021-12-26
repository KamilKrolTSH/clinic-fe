import { Link } from "react-router-dom";
import "./Home.css";
import Button from "@mui/material/Button";

export function Home() {
  return (
    <div className="Home">
      <Link
        style={{ width: "200px", marginBottom: "20px" }}
        className="link"
        to="/login"
      >
        <Button style={{ width: "200px" }} variant="contained">
          Login
        </Button>
      </Link>
      <Link
        style={{ width: "200px", marginBottom: "20px" }}
        className="link"
        to="/register"
      >
        <Button style={{ width: "200px" }} variant="contained">
          Register
        </Button>
      </Link>
      <Link
        style={{ width: "200px", marginBottom: "20px" }}
        className="link"
        to="/register-admin"
      >
        <Button style={{ width: "200px" }} variant="contained">
          Register Admin
        </Button>
      </Link>
    </div>
  );
}
