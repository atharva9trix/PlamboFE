import { Box } from "@mui/material";
import bg from "../../assets/bg.png";

export default function Background() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
      }}
    />
  );
}
