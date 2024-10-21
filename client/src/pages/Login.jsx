import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Container,
  Heading,
  Text,
  TextField,
  Button,
  Flex,
  Box,
} from "@radix-ui/themes";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { DIM_COLOR, FancyButton } from "../components/StyledComponents";
import ForgotPassword from "../components/auth/ForgotPassword";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password. Please try again.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Please try again later.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;
        default:
          setError("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <Container size="2" className="mt-20 px-4 sm:px-0">
      <Flex direction="column" align="center" gap="6">
        <Heading size="8" className="text-center" style={{ color: DIM_COLOR }}>
          Welcome Back
        </Heading>
        {error && (
          <Text color="red" size="2">
            {error}
          </Text>
        )}
        {showForgotPassword ? (
          <ForgotPassword onClose={() => setShowForgotPassword(false)} />
        ) : (
          <Box className="w-full max-w-sm">
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="4">
                <TextField.Root>
                  <TextField.Slot>
                    <FaEnvelope color={DIM_COLOR} />
                  </TextField.Slot>
                  <TextField.Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="custom-textfield"
                  />
                </TextField.Root>
                <TextField.Root>
                  <TextField.Slot>
                    <FaLock color={DIM_COLOR} />
                  </TextField.Slot>
                  <TextField.Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="custom-textfield"
                  />
                </TextField.Root>
                <Flex direction="column" gap="2">
                  <FancyButton type="submit" className="w-full py-2 text-sm">
                    Log In
                  </FancyButton>
                  <Flex justify="end">
                    <Button
                      variant="ghost"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-xs"
                      style={{ color: DIM_COLOR }}
                    >
                      Forgot Password?
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </form>
          </Box>
        )}
        <Text size="2" style={{ color: DIM_COLOR }}>
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-600 hover:underline">
            Sign up
          </Link>
        </Text>
      </Flex>
    </Container>
  );
}

export default Login;
