import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Message has been sent to your email address")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }


  return (
    <>
      <Container className="d-flex justify-content-center mt-5 pt-5">
        <Card style={{ minWidth: "40%", width: "450px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Reset Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
