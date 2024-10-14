import React, { useRef, useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Alert, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigateTo('/')
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };
  return (
    <>
      <Container
        className="d-flex justify-content-center"
        style={{ marginTop: "5rem" }}
      >
        <Card className="p-2" style={{ minWidth: "40%", width: "450px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <span className="mt-3 mb-0 d-flex justify-content-start">Forgot password?<Link className="ms-1" to="/forgot-password">Click here</Link></span>
              <Button
                disabled={loading}
                className="w-100 mt-4 mb-1"
                type="submit"
              >
                Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Register</Link>
      </div>
    </>
  );
}
