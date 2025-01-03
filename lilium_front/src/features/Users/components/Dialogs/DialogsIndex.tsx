import { useGlobalProvider } from "@/hooks/useGlobalProvider";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";

export const DialogsIndex = () => {
  const {
    editDialogOpen,
    deleteDialogOpen,
    editingUser,
    deletingUser,
    setEditDialogOpen,
    setDeleteDialogOpen,
    setEditingUser,
    setDeletingUser,
  } = useGlobalProvider();

  return (
    <>
      {editingUser && (
        <EditUserDialog
          openDialog={editDialogOpen}
          onClose={() => {
            setEditDialogOpen(false);
            setEditingUser(undefined);
          }}
          editingUser={editingUser}
        />
      )}
      {deletingUser && (
        <DeleteUserDialog
          openDialog={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setDeletingUser(undefined);
          }}
          deletingUser={deletingUser}
        />
      )}
    </>
  );
};
