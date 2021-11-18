import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { dashContext } from '../App'

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
  const LoginCtx = useContext(dashContext)
  const [loginData, setLoginData] = useState({ ...user });
  const [errors, setErrors] = useState({ ...error });

  const submit = async (e) => {


    e.preventDefault()
    let isValid = true

    if (loginData.email === "" || !validEmailRegex.test(loginData.email)) {
      error.email = 'Email is not valid!'
      isValid = false
    }
    if (loginData.password === "") {
      error.password = 'password is not valid!'
      isValid = false
    }
    setErrors({ ...errors })

    if (isValid) {

      axios.post('http://blog.joineight.com/api/v1/users/signin', { user: { ...loginData }, }, {
        headers: headers
      }).then(response => {
        // handle success
        console.log(response, "res");

        if (response.status === 200) {
          console.log("enquiry added")
          setErrors({ ...error })
          setLoginData({ ...user }) 
         localStorage.setItem("islogged",true)
          LoginCtx.setIsLoggedIn(true)       
        }       

      }).catch(err => {
        // handle error
        console.log(err)
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
    setLoginData({ ...loginData, [name]: value })
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
                  value={loginData.email}
                  onChange={e => handleInputChange(e.target.value, e.target.name)}
                  placeholder="Enter email" />
                {errors.email.length > 0 &&
                  <span className='error' style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={e => handleInputChange(e.target.value, e.target.name)}
                  placeholder="Enter Password" />
                {errors.password === "" &&
                  <span className='error' style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

            <div className=" mt-5">
              <span>Active User :</span><br />
              
                
              
              
            </div>
          </Col>
        </Row>
      </Container>

    </>
  )
}
