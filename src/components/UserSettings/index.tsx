"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import AuthContext from "../../contexts/AuthContext";

const UserSettings: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData({ ...response.data, password: "" });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (): void => {
    axios
      .put("http://localhost:3001/user", userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setSeverity("success");
        setSnackbarMessage("User information updated successfully.");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        setSeverity("error");
        setSnackbarMessage("Failed to update user information.");
        setOpenSnackbar(true);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Settings
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserSettings;
