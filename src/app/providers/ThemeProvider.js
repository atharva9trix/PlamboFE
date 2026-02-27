import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import theme from "../../ui/theme/theme";

export default function ThemeProvider({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
