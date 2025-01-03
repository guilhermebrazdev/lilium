import { useGlobalProvider } from "@/hooks/useGlobalProvider";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function UserListTable() {
  const { userList, setEditDialogOpen, setDeleteDialogOpen, setEditingUser, setDeletingUser } = useGlobalProvider();
  if (userList) {
    if (userList.length === 0) {
      return <Stack>No user found</Stack>;
    }

    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList &&
              userList.map((row, idx) => (
                <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center" sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      onClick={() => {
                        setEditDialogOpen(true);
                        setEditingUser(row);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteDialogOpen(true);
                        setDeletingUser(row);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
