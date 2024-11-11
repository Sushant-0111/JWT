import React from 'react';
import { get_notes, logout } from '../endpoints/api';
import { useEffect, useState } from'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row,Button } from 'react-bootstrap';

const Menu = () =>{
    const [notes, setNotes] = useState([])
    const nav = useNavigate()
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await get_notes();
                setNotes(data); // Assuming get_notes() returns an array of note objects
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            }
        };
        
        fetchNotes();
    }, []);

    const handleLogout = async ()=>{
        const success = await logout();
        if(success){
            nav('/login')
        }
    }
     
    return (
    <div>
        <Container className="vh-100 d-flex flex-column align-items-center justify-content-center text-center">
            <h1 className="mb-4">Welcome back, User</h1>
            <Row className="w-100">
                <Col>
                    {notes.length > 0 ? (
                        notes.map((note, index) => (
                            <h2 key={index} className="mb-3">
                                {note.description}
                            </h2>
                        ))
                    ) : (
                        <h2>No notes available</h2>
                    )}
                </Col>
            </Row>
            <Button onClick={handleLogout} variant="danger" className="mt-4">
                Logout
            </Button>
        </Container>
    </div>
  )
}

export default Menu
