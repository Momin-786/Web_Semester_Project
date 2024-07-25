import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';

const WeatherReport = () => {
  const [weatherReports, setWeatherReports] = useState([]);
  const [form, setForm] = useState({
    location: '',
    temperature: '',
    description: '',
    windSpeed: '',
    dateTime: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchWeatherReports();
  }, []);

  const fetchWeatherReports = async () => {
    try {
      const response = await axios.get('http://localhost:8000/weather-reports');
      setWeatherReports(response.data);
    } catch (error) {
      console.error('Error fetching weather reports', error);
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
        await axios.patch(`http://localhost:8000/weather-reports/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:8000/weather-reports', form);
      }
      setForm({
        location: '',
        temperature: '',
        description: '',
        windSpeed: '',
        dateTime: ''
      });
      fetchWeatherReports();
    } catch (error) {
      console.error('Error submitting weather report', error);
    }
  };

  const handleEdit = (report) => {
    setEditingId(report._id);
    setForm(report);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/weather-reports/${id}`);
      fetchWeatherReports();
    } catch (error) {
      console.error('Error deleting weather report', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Weather Reports</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={form.location}
                onChange={handleInputChange}
                placeholder="Location"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="temperature">
              <Form.Label>Temperature</Form.Label>
              <Form.Control
                type="number"
                name="temperature"
                value={form.temperature}
                onChange={handleInputChange}
                placeholder="Temperature"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="windSpeed">
              <Form.Label>Wind Speed</Form.Label>
              <Form.Control
                type="number"
                name="windSpeed"
                value={form.windSpeed}
                onChange={handleInputChange}
                placeholder="Wind Speed"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="dateTime">
              <Form.Label>Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="dateTime"
                value={form.dateTime}
                onChange={handleInputChange}
                placeholder="Date Time"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          {editingId ? 'Update' : 'Add'} Weather Report
        </Button>
      </Form>
      <ListGroup className="mt-4">
        {weatherReports.map((report) => (
          <ListGroup.Item className='my-2' key={report._id}>
            <Row className=''>
              <Col md={3} className='my-2'><strong>Location:</strong> {report.location}</Col>
              <Col md={2} className='my-2'><strong>Temp:</strong> {report.temperature}°C</Col>
              <Col md={3} className='my-2'><strong>Description:</strong> {report.description}</Col>
              <Col md={2} className='my-2'><strong>Wind Speed:</strong> {report.windSpeed} m/s</Col>
              <Col md={2} className='my-2'><strong>Date:</strong> {new Date(report.dateTime).toLocaleString()}</Col>
              <Col md={12} className="mt-4 d-flex gap-5">
                <Button variant="warning" onClick={() => handleEdit(report)} className="me-5">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(report._id)}>Delete</Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default WeatherReport;
