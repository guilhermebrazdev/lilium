import { PaletteOptions, createTheme, BreakpointsOptions } from "@mui/material";

const getPalette = (): PaletteOptions => {
  return {
    primary: {
      main: "#05353d",
      contrastText: "#fcfcfc",
      dark: "#042a31",
      light: "#0a4856",
      "50": "#d5e8eb",
      "100": "#accfd5",
      "200": "#82b6bf",
      "300": "#589da9",
      "400": "#2e8493",
      "500": "#3d646b",
      "600": "#042f36",
      "700": "#03262d",
      "800": "#021d23",
      "900": "#011319",
    },
  };
};

const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1200,
    xl: 1536,
  },
};

export const LiliumStylesTheme = () => {
  return createTheme({
    palette: getPalette(),
    breakpoints: breakpoints,
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          input:-webkit-autofill {
            background-color: transparent;
            box-shadow: 0 0 0px 1000px transparent inset;
            -webkit-text-fill-color: inherit;
            transition: background-color 5000s ease-in-out 0s;
            }
        `,
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: "outlined",
          InputLabelProps: {
            sx: {
              color: "#0000006d",
            },
          },
          sx: {
            "& .MuiInputBase-root.Mui-disabled fieldset.MuiOutlinedInput-notchedOutline": {
              borderStyle: "dashed",
            },
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          fullWidth: true,
        },
      },
    },
  });
};
