import { Typography, TypographyProps, styled } from "@mui/material";

export const HeaderText = styled(Typography)<TypographyProps>((props) => ({
  "&": {
    fontFamily: "Cinzel, serif",
    fontWeight: 600,
    fontSize: "2rem",
    ...props,
  },
}));

export const DescriptionText = styled(Typography)<TypographyProps>((props) => ({
  "&": {
    fontFamily: "Spartan, sans-serif",
    fontSize: "1.2rem",
    ...props,
  },
}));
