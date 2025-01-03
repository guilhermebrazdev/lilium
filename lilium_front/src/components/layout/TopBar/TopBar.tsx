import { AppBar, ButtonBase, Toolbar } from "@mui/material";
import { lilium_logo } from "@/assets";

export const TopBar = () => {
  return (
    <AppBar sx={{ backgroundColor: "transparent", height: 84, zIndex: 3, boxShadow: "none" }} position="relative">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <ButtonBase
          sx={{
            width: 130,
          }}
        >
          <img src={lilium_logo} alt="Logo" width={"100%"} />
        </ButtonBase>
      </Toolbar>
    </AppBar>
  );
};
