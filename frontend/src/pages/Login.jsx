import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { Container, Heading, Text, TextField, Button, Flex } from '@radix-ui/themes';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to log in');
    }
  };

  return (
    <Container size="2" className="mt-10">
      <Heading size="8" className="mb-6">Login</Heading>
      {error && <Text color="red" className="mb-4">{error}</Text>}
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <TextField.Root>
            <TextField.Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </TextField.Root>
          <TextField.Root>
            <TextField.Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </TextField.Root>
          <Button type="submit">Log In</Button>
        </Flex>
      </form>
    </Container>
  );
}

export default Login;
