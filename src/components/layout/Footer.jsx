import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        mt: "auto",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} <strong>Swift Escrow Enterprises</strong>. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
