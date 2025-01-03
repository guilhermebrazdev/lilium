import { useGlobalProvider } from "@/hooks/useGlobalProvider";
import { Search } from "@mui/icons-material";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { UserListTable } from "./UserListTable";

export const UserList = () => {
  const { loadUserList, setGlobalLoading } = useGlobalProvider();
  const [searchQuery, setSearchQuery] = useState("");

  async function handleSearch(search: string) {
    setGlobalLoading(true);
    await loadUserList(search);
    setGlobalLoading(false);
  }

  useEffect(() => {
    loadUserList();
  }, []);

  return (
    <Stack width={"100%"} alignItems={{ lg: "center" }} padding={2}>
      <Stack alignItems={"center"} border={"1px solid grey"} borderRadius={2} width={{ lg: 1200 }}>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-evenly"}
          alignItems={"baseline"}
          padding={2}
          gap={{ xs: 2, md: 4 }}
          marginBottom={4}
        >
          <TextField
            name="search"
            label={"search"}
            placeholder="Username or ID"
            sx={{ marginTop: 1 }}
            value={searchQuery}
            onChange={(newValue) => setSearchQuery(newValue.target.value)}
            onKeyDown={(key) => {
              if (key.key === "Enter") {
                handleSearch(searchQuery);
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            size="small"
          />
          <Button
            variant="contained"
            sx={{ width: 80, height: 40, bgcolor: "#05353d" }}
            onClick={() => handleSearch(searchQuery)}
          >
            Search
          </Button>
        </Stack>
        <UserListTable />
      </Stack>
    </Stack>
  );
};
