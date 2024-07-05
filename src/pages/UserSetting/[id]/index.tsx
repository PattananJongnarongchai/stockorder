"use client";

import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import AuthContext from "../../../contexts/AuthContext";

const UserSetting: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const { user, token } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query; // Ensure we get the user ID from the URL

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3001/users/${id}/password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error changing password:", err);
      setError("Error changing password. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        <TextField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleChangePassword}
          fullWidth
        >
          Change Password
        </Button>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Password changed successfully.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default UserSetting;
