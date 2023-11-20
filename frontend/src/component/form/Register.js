import { Container } from "react-bootstrap";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from "axios";



function Register(){
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({
        username:'',
        password:'',
        city:'',
        address:''

    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Menyalin objek user dan memperbarui nilai yang sesuai
        setUser(prevUser => ({
          ...prevUser,
          [name]: value
        }));
      };

  const handleSubmit = (event) => {
   event.preventDefault()
    setValidated(true)
    axios.post('http://localhost:8080/user/register', user, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      })
        .then(response => {
          console.log(response.data);
          // Handle the response data
        })
        .catch(error => {
          console.error('There was a problem with the axios request:', error);
        });
  };
    return(
        <Container style={{
            display:'flex',
            height:'100vh',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <div style={{
                width:'90%'
            }}>

            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        
        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustomPass">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="city"onChange={handleInputChange} placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" name="address" onChange={handleInputChange} placeholder="Address" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Address.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit" variant="warning" style={{alignSelf:'center'}}>Submit form</Button>
    </Form>
    <p>Username: {user.username}</p>
      <p>Password: {user.password}</p>
      <p>Address: {user.city}</p>
      <p>Address: {user.address}</p>
    </div>
        </Container>
    )
}

export default Register;