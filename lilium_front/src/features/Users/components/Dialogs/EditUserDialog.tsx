import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AccountCircleOutlined, Check, Clear, EmailOutlined, LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { IUpdateUserPayload } from "@/interfaces/IUpdateUserPayload";
import { IUser } from "@/interfaces/IUser";
import { editUser } from "../../services/usersServices";
import { useGlobalProvider } from "@/hooks/useGlobalProvider";

interface EditUserDialogProps {
  openDialog: boolean;
  editingUser: IUser;
  onClose: () => void;
}

export const EditUserDialog = ({ openDialog, editingUser, onClose }: EditUserDialogProps) => {
  const { loadUserList, setGlobalLoading } = useGlobalProvider();

  const updateUserDefaultValues: IUpdateUserPayload = {
    username: editingUser.username,
    email: editingUser.email,
    password: "",
    newPassword: "",
  };

  const [noEditChangeError, setNoEditChangeError] = useState(false);

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: updateUserDefaultValues });

  async function onSubmit(data: IUpdateUserPayload) {
    const noEditChange =
      watch("username") === editingUser.username && watch("email") === editingUser.email && !watch("newPassword");
    setNoEditChangeError(noEditChange);

    if (!noEditChange) {
      setGlobalLoading(true);
      const success = await editUser(editingUser.id, data);

      if (success) {
        loadUserList();
        onClose();
      }
      setGlobalLoading(false);
    }
  }

  return (
    <Dialog open={openDialog} onClose={onClose} maxWidth={"sm"} component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        Edit user
        <Divider />
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {noEditChangeError && (
          <Typography color="error" fontSize={12} sx={{ marginBottom: 1 }}>
            At least one field must be filled to edit.
          </Typography>
        )}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={"Name"}
              size="small"
              sx={{ marginTop: 1 }}
              value={watch("username", updateUserDefaultValues.username)}
              onChange={(newValue) => setValue("username", newValue.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={"Email"}
              size="small"
              value={watch("email", updateUserDefaultValues.email)}
              onChange={(newValue) => setValue("email", newValue.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={"New password"}
              size="small"
              type="password"
              value={watch("newPassword", updateUserDefaultValues.newPassword)}
              onChange={(newValue) => setValue("newPassword", newValue.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label={"Current password*"}
              sx={{ marginTop: 3 }}
              size="small"
              type="password"
              value={watch("password", updateUserDefaultValues.password)}
              onChange={(newValue) => setValue("password", newValue.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onClose} variant="outlined" startIcon={<Clear />}>
          Close
        </Button>
        <Button variant="contained" startIcon={<Check />} type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
