import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      login(response.data.token, username);
      router.push("/dashboard"); // Redirect to a protected route
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
