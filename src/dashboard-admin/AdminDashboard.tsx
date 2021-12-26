import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { ApplicationUser } from "../types/application-user";
import { ClinicClient } from "../clients/clinic.client";
import { Link } from "react-router-dom";

const clinicClient = new ClinicClient();

export function AdminDashboard() {
  const [users, setUsers] = useState<ApplicationUser[]>([]);

  useEffect(() => {
    loadApplicationUsers();
  }, []);

  const loadApplicationUsers = async () => {
    const applicationUsers = await clinicClient.getApplicationUsers();
    setUsers(applicationUsers.content!);
  };

  return (
    <div className="Dashboard">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link className="link" to={`/user-details/${user.userName}`}>
                    {index + 1}
                  </Link>
                </TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
