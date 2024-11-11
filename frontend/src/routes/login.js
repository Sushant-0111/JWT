import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import {Container, Row, Col } from 'react-bootstrap';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login_user} = useAuth();
    const nav = useNavigate();


    const handleLogin =  async() => {
      await login_user(username, password)
  };

    const handleNav = () =>{
        nav('/register')
    }
 
  
  return (
  <div style={{backgroundColor:'#191970'}}>
  <Container  className="d-flex vh-100 ">
            <Row className="m-auto align-self-center">
                <Col className="mx-auto">
                    <Form className="p-5 border rounded shadow bg-white">
                        <h3 className="text-center mx-4">Login</h3>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                required
                                onChange={(e)=> setUsername(e.target.value)}
                                value={username}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </Form.Group>

                        <Button onClick={handleLogin} className="w-100">
                            Login
                        </Button>
                        <p className='pt-3' onClick = {handleNav}> Dont have an account? Sign Up</p>
                    </Form>
                </Col>
            </Row>
        </Container>
</div>  
)
}

export default Login;
