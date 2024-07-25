import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Avatar,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });
      const { token, user } = response.data; // Ensure your backend sends back user data
      authContext?.login(token, user);
      router.push("/dashboard");
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Invalid username or password. Please try again.");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(to right, #e66465, #9198e5)",
        position: "relative",
      }}
    >
      <img src="/images/background.png" alt="" width="900px" height="100px"/>
      <Container
        component={Paper}
        elevation={6}
        maxWidth="xs"
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)", // เพิ่มความโปร่งใสของพื้นหลังฟอร์ม
          position: "absolute",
          right: 0,
          height: "100vh",
          marginRight: 4, // เพิ่ม margin ให้ขยับออกจากขอบขวา
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate>
          <Stack spacing={2} sx={{ width: "100%", mt: 3 }}>
            <TextField
              autoFocus
              error={!!error}
              fullWidth
              helperText={error}
              label="Username"
              name="username"
              onBlur={() => setError("")}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              type="text"
              value={username}
              variant="outlined"
            />
            <TextField
              error={!!error}
              fullWidth
              helperText={error}
              label="Password"
              name="password"
              onBlur={() => setError("")}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              type={showPassword ? "text" : "password"}
              value={password}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClick} edge="end">
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Button
            fullWidth
            sx={{ mt: 3 }}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Page;
