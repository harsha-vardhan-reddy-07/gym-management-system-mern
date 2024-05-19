import React, { useState } from 'react';
import { Container, Col, Form, InputGroup, Row, FloatingLabel } from 'react-bootstrap';
import { message } from 'antd';
import axiosInstance from '../common/AxiosInstance';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import AllItems from './AllItems';

const Items = () => {
   const [itemsDetails, setItemsDetails] = useState({
      name: '',
      targetMuscles: "",
      image: "",
      quantity: 0,
      description: "",
      type: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setItemsDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };


   const handleSubmit = (e) => {
      e.preventDefault();

      axiosInstance.post('/add-equipment', itemsDetails)
         .then((res) => {
               message.success("Equipment added successfully");
               setItemsDetails({
                  name: '',
                  targetMuscles: "",
                  image: "",
                  quantity: 0,
                  description: "",
                  type: ""
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
               <h1 className='text-center text-light'>Add Equipments</h1>
            </div>
            <div className="left">
               <Form
                  style={{ padding: '25px' }}
                  onSubmit={handleSubmit}>
                  
                  
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <Form.Label>Equipment Name</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="name"
                              required
                              name='name'
                              value={itemsDetails.name}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>

                  <Row className="mb-3">
                     <Form.Group as={Col} md="6">
                        <Form.Label>Equipment type</Form.Label>
                        <Form.Select name='type' value={itemsDetails.type} onChange={handleChange}>
                           <option>Select Type</option>
                           <option>Treadmils</option>
                           <option>Ellipticals</option>
                           <option>Stationary bikes</option>
                           <option>weight machines</option>
                           <option>cable machines</option>
                           <option>dumbbells</option>
                           <option>barbells</option>
                           <option>exercise mats</option>
                           <option>resistance bands</option>
                        </Form.Select>
                     </Form.Group>

                     
                     <Form.Group as={Col} md="6">
                        <Form.Label>Quantity</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="number"
                              placeholder="quantity"
                              required
                              name='quantity'
                              value={itemsDetails.quantity}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>

                  </Row>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <Form.Label>Target muscles</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="targetMuscles"
                              required
                              name='targetMuscles'
                              value={itemsDetails.targetMuscles}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <Form.Label>Equipment Image</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="image"
                              required
                              name='image'
                              value={itemsDetails.image}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <Form.Label>Equipment Description</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              as = "textarea"
                              rows={3}
                              placeholder="description"
                              required
                              name='description'
                              value={itemsDetails.description}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <div className="d-flex justify-content-center my-5">
                     <Button variant='contained' size="large" type='submit' startIcon={<AddIcon />}>
                        Add Item
                     </Button>
                  </div>
               </Form>
            </div>
         </div>

         <AllItems />
      </Container>
   )
}

export default Items
