import React, { useRef, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Alert, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigateTo = useNavigate();

  const registerAlert = () => toast.success('Account registered successfully', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password does not match");
    }

    try {
      setError("");
      setLoading(true);
      console.log("Attempting to register with:", emailRef.current.value);
      const result = await register(emailRef.current.value, passwordRef.current.value);
      console.log("Registration result:", result);
      registerAlert();
      navigateTo('/')
    } catch (error) {
      console.error("Registration error:", error);
      setError(`Failed to create an account: ${error.message}`);
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
            <h2 className="text-center mb-4">Register</h2>
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
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={confirmPasswordRef}
                  required
                />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 mt-4 mb-1"
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
