import React, { useState } from 'react';
import { Container, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { message } from 'antd';
import axiosInstance from '../common/AxiosInstance';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import AllMonthlyPlans from './AllMonthlyPlans';

const MonthlyPlans = () => {
   const [plansDetails, setPlansDetails] = useState({
      title: '',
      description: '',
      image: '',
      amount: '',
      duration: 0
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setPlansDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };


   const handleSubmit = (e) => {
      e.preventDefault();


      axiosInstance.post('/add-monthly-plan', plansDetails)
         .then((res) => {
            message.success('Plan added successfully');
            setPlansDetails({
               title: '',
               description: '',
               image: '',
               amount: '',
               duration: 0
            });
         })
         .catch((error) => {
            message.error(error);
            console.error('Error adding Item:', error);
         });
   };

   return (
      <Container>
         <div className="layout">
            <div className="left">
               <h1 className='text-center text-light'>Monthly Plans</h1>
            </div>
            <div className="left">
               <Form
                  style={{ padding: '25px' }}
                  onSubmit={handleSubmit}>
                     <h3 style={{ color: 'white', textAlign: "center" }} >Add new plan</h3>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <Form.Label>Title</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="title"
                              aria-describedby="inputGroupPrepend"
                              required
                              name='title'
                              value={plansDetails.title}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                        <Form.Label>Amount</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="number"
                              placeholder="amount"
                              aria-describedby="inputGroupPrepend"
                              required
                              name='amount'
                              value={plansDetails.amount}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>

                     <Form.Group as={Col} md="6">
                        <Form.Label>duration(in days)</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="number"
                              placeholder="duration"
                              required
                              name='duration'
                              value={plansDetails.duration}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <Form.Label>Image url</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="image"
                              aria-describedby="inputGroupPrepend"
                              required
                              name='image'
                              value={plansDetails.image}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <Form.Label>Description</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="description"
                              aria-describedby="inputGroupPrepend"
                              required
                              name='description'
                              value={plansDetails.description}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <div className="d-flex justify-content-center my-5">
                     <Button variant='contained' size="large" type='submit' startIcon={<AddIcon />}>
                        Add Plan
                     </Button>
                  </div>
               </Form>
            </div>
         </div>
         <AllMonthlyPlans />
      </Container>
   )
}

export default MonthlyPlans