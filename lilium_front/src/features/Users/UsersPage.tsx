import { Stack } from "@mui/material";
import { AddUserForm } from "./components/AddUserForm";
import { UserList } from "./components/UserList/UserList";
import { DialogsIndex } from "./components/Dialogs/DialogsIndex";

export const UsersPage = () => {
  return (
    <Stack height={"100%"} alignItems={"center"}>
      <DialogsIndex />
      <AddUserForm />
      <UserList />
    </Stack>
  );
};
