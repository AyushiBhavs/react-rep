import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const user = {  
    email: "",
    password: ""  
}
const error = {
  email: "",
  password: ""
}

export default function Login() {
  const [formData, setFormData] = useState({ ...user });
  const [errors, setErrors] = useState({ ...error });


  const submit = async (e) => {
    e.preventDefault()
    let isValid = true

    if (formData.email === "" || !validEmailRegex.test(formData.email)) {
      error.email = 'Email is not valid!'
      isValid = false
    }
    if (formData.password === "") {
      error.password = 'password is not valid!'
      isValid = false
    }
    setErrors({ ...errors })

    if (isValid) {
      console.log(formData, "formdata")
      axios.post('http://blog.joineight.com/api/v1/users/signin', { ...formData }, {
        headers: headers
      }).then(response => {
        // handle success
        console.log(response, "res");
      }).catch(error => {
        // handle error
        console.log(error, "error api");
      })
    }

  }






  const handleInputChange = (value, name) => {

    switch (name) {
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;

      case 'password':
        errors.password =
          value === ""
            ? ''
            : 'password is not valid!';
        break;

      default:
        break;
    }
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors })
  }
  return (
    <>

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className="text-center" style={{ color: "#dce8f0" }}>JoinEight</h1>
            <Form onSubmit={(e) => submit(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={e => handleInputChange(e.target.value, e.target.name)}
                  placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never shae your email with anyone else.
                </Form.Text>
                {errors.email.length > 0 &&
                  <span className='error' style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={e => handleInputChange(e.target.value, e.target.name)}
                  placeholder="Enter Password" />
                {/* <label id="showError" className="error"></label> */}
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>


            <div className="d-none">
              <span>Active User:</span><br />
              <Button variant="primary">
                Logout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
