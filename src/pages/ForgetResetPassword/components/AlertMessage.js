import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({
    severity = "info",
    message = "",
    autoHideDuration = 3000,
    onClose,
    sx
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
        if (onClose) onClose();
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert onClose={handleClose} severity={severity} sx={sx}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertMessage;
