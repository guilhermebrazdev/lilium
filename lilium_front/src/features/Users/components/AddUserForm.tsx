import { Stack, TextField, Button, Typography, InputAdornment } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AccountCircleOutlined, EmailOutlined, LockOutlined } from "@mui/icons-material";
import { IAddUserPayload } from "@/interfaces/IAddUserPayload";
import { addNewUser } from "../services/usersServices";
import { useGlobalProvider } from "@/hooks/useGlobalProvider";

export const AddUserForm = () => {
  const { setGlobalLoading, loadUserList } = useGlobalProvider();

  const newUserDefaultValues: IAddUserPayload = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: newUserDefaultValues });

  async function onSubmit(data: IAddUserPayload) {
    setGlobalLoading(true);
    const newUser = await addNewUser(data);
    if (newUser) {
      reset();
      await loadUserList();
    }
    setGlobalLoading(false);
  }

  return (
    <Stack spacing={3} padding={2} width={{ sm: 400 }}>
      <Typography variant="h5" align="center">
        Add new user
      </Typography>

      <Stack component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label={"Username*"}
                sx={{ marginTop: 1 }}
                value={watch("username", newUserDefaultValues.username)}
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
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label={"Email*"}
                sx={{ marginTop: 1 }}
                value={watch("email", newUserDefaultValues.username)}
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
                error={!!errors.email}
                helperText={errors.email?.message}
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
                label={"Password*"}
                type="password"
                sx={{ marginTop: 1 }}
                value={watch("password", newUserDefaultValues.password)}
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
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Required",
              validate: (value) => value === watch("password") || "Passwords do not match",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={"Confirm password*"}
                type="password"
                sx={{ marginTop: 1 }}
                value={watch("confirmPassword", newUserDefaultValues.confirmPassword)}
                onChange={(newValue) => setValue("confirmPassword", newValue.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />

          <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
            Add
          </Button>
          <Button variant="outlined" color="primary" onClick={() => reset()} sx={{ marginTop: 2 }}>
            Clear
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
