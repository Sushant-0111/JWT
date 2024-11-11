import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Cpassword, setCPassword] = useState('')


    const {register_user} = useAuth();
    const nav = useNavigate();
    
    const handleRegister = async() =>{
        const response = await register_user(username, email, password , Cpassword)
        return response
    }
    const handleNavigate = () => {
        nav('/login')
    }

  return (
<div style={{backgroundColor:'#191970'}}>
 <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Form className="p-5 border rounded shadow bg-white">
                        <h3 className="text-center">Login</h3>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                required
                                onChange={(e) => setCPassword(e.target.value)}
                                value={Cpassword}
                            />
                        </Form.Group>
                        <Button onClick={handleRegister} className="w-100" variant="primary">
                            Login
                        </Button>
                        <p className="pt-3 text-center">
                            Have an account?{' '}
                            <span className="text-primary" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
                                Sign up
                            </span>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container> 
</div>  
)
}

export default Register;
