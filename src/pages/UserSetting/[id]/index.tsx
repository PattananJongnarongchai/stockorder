import React, { useContext, useState, ChangeEvent } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";
import AuthContext from "@/contexts/AuthContext";

const UserSettings: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { user, token, logout } = authContext;

  const [username, setUsername] = useState<string>(user?.username || "");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `/api/users/${user?.id}`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSeverity("success");
      setSnackbarMessage("Username updated successfully.");
      setOpenSnackbar(true);
    } catch (err) {
      setSeverity("error");
      setSnackbarMessage("Error updating username.");
      setOpenSnackbar(true);
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.put(
        `/api/users/${user?.id}/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSeverity("success");
      setSnackbarMessage("Password updated successfully.");
      setOpenSnackbar(true);
      logout();
    } catch (err) {
      setSeverity("error");
      setSnackbarMessage("Error updating password.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Settings
        </Typography>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Update Username
            </Typography>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateUser}
              fullWidth
            >
              Update Username
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCurrentPassword(e.target.value)
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              fullWidth
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
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
