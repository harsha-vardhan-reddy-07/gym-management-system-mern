import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { message } from 'antd';
import NavBar from './NavBar';
import { Container, Dropdown, Form, Row, Col, InputGroup } from 'react-bootstrap';
import axiosInstance from "./AxiosInstance"
const Register = () => {
   const navigate = useNavigate()

   const [selectedOption, setSelectedOption] = useState('Select Role');
   const [data, setData] = useState({
      username: "",
      email: "",
      password: "",
      usertype: "",
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSelect = (eventKey) => {
      setSelectedOption(eventKey);
      setData({ ...data, usertype: eventKey });
   };

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log(data)
      if (!data?.username || !data?.email || !data?.password) return alert("Please fill all fields");
      else {
         axiosInstance.post('/register', data)
            .then((response) => {
                  message.success(response.data.message);

                  localStorage.setItem("userId", response.data._id);
                  localStorage.setItem("username", response.data.username);
                  localStorage.setItem("email", response.data.email);
                  localStorage.setItem("usertype", response.data.usertype);

                  if(response.data.usertype === "Customer"){
                     navigate('/customerhome')
                  } 

                  else if(response.data.usertype === "Trainer"){
                     navigate('/trainerhome')
                  } 

                  else if(response.data.usertype === "Admin") {
                     navigate('/adminhome')
                  }
            })
            .catch((error) => {
               console.log("Error", error);
            });
      }
   };
   return (
      <div>
         <NavBar />
         <div className="first-container">

            <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
               <Box
                  sx={{
                     marginTop: 4,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     padding: 5,
                     background: '#5a605fd4',
                     borderRadius: '5px'
                  }}
               >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign up
                  </Typography>

                  <Form
                     style={{ padding: '25px' }}
                     onSubmit={handleSubmit}>
                     <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                           <Form.Label>User Name</Form.Label>
                           <InputGroup hasValidation>
                              <Form.Control
                                 name="username"
                                 value={data.username}
                                 onChange={handleChange}
                              />
                           </InputGroup>
                        </Form.Group>


                     </Row>
                     <Row >
                        <Form.Group className="mb-3" as={Col} md="12">
                           <Form.Label>Email</Form.Label>
                           <Form.Control
                              name="email"
                              value={data.email}
                              onChange={handleChange}
                           />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md="12">
                           <Form.Label>Password</Form.Label>
                           <InputGroup hasValidation>
                              <Form.Control
                                 name="password"
                                 value={data.password}
                                 onChange={handleChange}
                                 type="password"
                              />
                           </InputGroup>
                        </Form.Group>
                     </Row>
                     <Row className="d-flex flex-column align-items-center my-3">
                        

                        <Form.Group as={Col} md="6">
                           <Dropdown className='my-2 mx-4'>
                              <Dropdown.Toggle variant="contained-primary" id="dropdown-basic">
                                 {selectedOption}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                 <Dropdown.Item onClick={() => handleSelect("Customer")}>Customer</Dropdown.Item>
                                 <Dropdown.Item onClick={() => handleSelect("Trainer")}>Trainer</Dropdown.Item>
                                 <Dropdown.Item onClick={() => handleSelect("Admin")}>Admin</Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </Form.Group>
                     </Row>
                     <div className="d-flex flex-column align-items-center my-2">
                        <Button variant='contained' size="large" type='submit'
                        // startIcon={<AddIcon />}
                        >
                           Sign Up
                        </Button>
                        <span className='mt-2' >Have an account?<Link style={{ color: "#090987" }} to={'/login'} variant="body2">
                           Sign In
                        </Link></span>
                     </div>
                  </Form>
               </Box>
            </Container>
         </div>
      </div>
   )
}

export default Register
