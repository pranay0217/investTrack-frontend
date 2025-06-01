import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export function SignUp() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* ──────────────────────────────────────────
     Handle Google OAuth redirect
  ────────────────────────────────────────── */
  useEffect(() => {
    const params   = new URLSearchParams(location.search);
    const username = params.get('username');
    const token    = params.get('token');
    const email    = params.get('email');

    if (username && token) {
      localStorage.setItem('username', username);
      localStorage.setItem('token',    token);
      localStorage.setItem('email',    email);
      navigate('/dashboard');
    }
  }, [location, navigate]);

  /* ──────────────────────────────────────────
     Handle manual sign-up
  ────────────────────────────────────────── */
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
        username: data.username,
        email:    data.email,
        password: data.password,
      });

      if (res.data?.user) {
        toast.success('Sign-up successful!');
        localStorage.setItem('Users',    JSON.stringify(res.data.user));
        localStorage.setItem('username', res.data.user.username);
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'An unexpected error occurred.';
      toast.error(msg);
    }
  };

  /* ──────────────────────────────────────────
     JSX
  ────────────────────────────────────────── */
  return (
    <>
      <Toaster position="top-center" />

      <Container
        fluid
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{ backgroundColor: '#f2f2f2' }}
      >
        <Row className="w-100 justify-content-center px-3">
          {/*  xs=12  sm=10  md=6  lg=4 : perfect scaling */}
          <Col xs={12} sm={10} md={6} lg={4}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <h2 className="text-center fw-bold mb-4">INVEST-TRACK</h2>

                {/* ------------------ FORM ------------------ */}
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* USERNAME */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      isInvalid={!!errors.username}
                      {...register('username', { required: 'Username is required' })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* EMAIL */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      isInvalid={!!errors.email}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* PASSWORD */}
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      isInvalid={!!errors.password}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'At least 6 characters' },
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* SUBMIT */}
                  <Button type="submit" className="w-100 mb-2" variant="success">
                    Sign Up
                  </Button>
                </Form>

                {/* -------------- Existing account -------------- */}
                <p className="text-center mt-3 mb-2">
                  Already have an account?&nbsp;
                  <a href="/login" className="text-decoration-none">
                    Log in
                  </a>
                </p>

                {/* ------------------ Divider ------------------ */}
                <div className="text-center my-3 fw-semibold text-muted">OR</div>

                {/* ---------------- Google Button -------------- */}
                <Button
                  variant="outline-secondary"
                  className="w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => (window.location.href = 'https://investtrack-y0gf.onrender.com/auth/google')}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    style={{ width: 20, height: 20 }}
                  />
                  Sign up with Google
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
