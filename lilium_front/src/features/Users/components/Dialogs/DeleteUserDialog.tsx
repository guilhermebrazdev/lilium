import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { Check, Clear } from "@mui/icons-material";
import { IUser } from "@/interfaces/IUser";
import { deleteUser } from "../../services/usersServices";
import { useGlobalProvider } from "@/hooks/useGlobalProvider";

interface DeleteUserDialogProps {
  openDialog: boolean;
  deletingUser: IUser;
  onClose: () => void;
}

export const DeleteUserDialog = ({ openDialog, deletingUser, onClose }: DeleteUserDialogProps) => {
  const { loadUserList, setGlobalLoading } = useGlobalProvider();

  async function handleDelete() {
    setGlobalLoading(true);
    const success = await deleteUser(deletingUser.id);

    if (success) {
      await loadUserList();
      onClose();
    }
    setGlobalLoading(false);
  }

  return (
    <Dialog open={openDialog} onClose={onClose} maxWidth={"sm"}>
      <DialogTitle>
        Delete user
        <Divider />
      </DialogTitle>
      <DialogContent>
        Are you sure you want to permanently delete the user <strong>{deletingUser.username}</strong>? This action
        cannot be undone.
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onClose} variant="outlined" startIcon={<Clear />}>
          Close
        </Button>
        <Button variant="contained" startIcon={<Check />} onClick={() => handleDelete()}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
