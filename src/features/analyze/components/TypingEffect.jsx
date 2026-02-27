import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

const TypingEffect = ({ text, speed = 30, sx = {} }) => {
  
  const safeText =
    typeof text === "string"
      ? text
      : text !== undefined && text !== null
      ? String(text)
      : "";

  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!safeText) {
      setDisplayedText("");
      return;
    }

    let i = 0;
    setDisplayedText("");
    setDone(false);

    const interval = setInterval(() => {
      if (i < safeText.length) {
        setDisplayedText((prev) => prev + safeText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [safeText, speed]);

  return (
    <Typography
      variant="body2"
      sx={{
        whiteSpace: "pre-line",
        lineHeight: 1.7,
        ...sx,
      }}
    >
      {displayedText}
      {!done && safeText && (
        <Box
          component="span"
          sx={{
            display: "inline-block",
            width: "6px",
            height: "1em",
            backgroundColor: "currentColor",
            ml: "2px",
            animation: "blink 1s step-end infinite",
            "@keyframes blink": {
              "0%,100%": { opacity: 0 },
              "50%": { opacity: 1 },
            },
          }}
        />
      )}
    </Typography>
  );
};

export default TypingEffect;
