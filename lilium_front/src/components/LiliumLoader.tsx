import { CircularProgress, Fade, Stack, StackProps } from "@mui/material";
import { CSSProperties } from "react";

interface LoaderProps {
  hidden?: boolean;
  translucent?: boolean;
  sx?: StackProps["sx"];
  position?: CSSProperties["position"];
  size?: number | string;
}

export const LiliumLoader = ({ hidden = false, translucent = false, sx, position = "absolute", size }: LoaderProps) => {
  return (
    <Fade in={!hidden} timeout={{ exit: 300, enter: 300 }}>
      <Stack
        position={position}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        left={0}
        top={0}
        zIndex={1301}
        sx={{
          backgroundColor: translucent ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255)",
          ...sx,
        }}
      >
        <CircularProgress size={size ?? undefined} />
      </Stack>
    </Fade>
  );
};
