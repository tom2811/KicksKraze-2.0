import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { Container, Heading, Text, TextField, Button, Flex, Box } from '@radix-ui/themes';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { DIM_COLOR, FancyButton } from '../components/StyledComponents';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError("Passwords don't match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    try {
      await register(email, password);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    }
  };

  return (
    <Container size="2" className="mt-20 px-4 sm:px-0">
      <Flex direction="column" align="center" gap="6">
        <Heading size="8" className="text-center" style={{ color: DIM_COLOR }}>
          Create Account
        </Heading>
        {error && <Text color="red" size="2">{error}</Text>}
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
              <TextField.Root>
                <TextField.Slot>
                  <FaLock color={DIM_COLOR} />
                </TextField.Slot>
                <TextField.Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className="custom-textfield"
                />
              </TextField.Root>
              <FancyButton type="submit" className="w-full py-2 text-sm">
                Register
              </FancyButton>
            </Flex>
          </form>
        </Box>
        <Text size="2" style={{ color: DIM_COLOR }}>
          Already have an account? <Link to="/login" className="text-cyan-600 hover:underline">Log in</Link>
        </Text>
      </Flex>
    </Container>
  );
}

export default Register;
