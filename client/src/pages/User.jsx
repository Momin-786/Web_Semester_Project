import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';

const User = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.patch(`http://localhost:8000/users/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:8000/users', form);
      }
      setForm({
        name: '',
        email: '',
        password: ''
      });
      fetchUsers();
    } catch (error) {
      console.error('Error submitting user', error);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setForm(user);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">User Management</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          {editingId ? 'Update' : 'Add'} User
        </Button>
      </Form>
      <ListGroup className="mt-4">
        {users.map((user) => (
          <ListGroup.Item className='my-2' key={user._id}>
            <Row>
              <Col md={3}><strong>Name:</strong> {user.name}</Col>
              <Col md={5}><strong>Email:</strong> {user.email}</Col>
              <Col md={4} className="mt-2 d-flex">
                <Button variant="warning" onClick={() => handleEdit(user)} className="mx-1">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default User;
