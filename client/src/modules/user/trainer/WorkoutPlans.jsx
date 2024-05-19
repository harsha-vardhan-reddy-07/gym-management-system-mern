import React, { useState } from 'react';
import { Container, Col, Form, InputGroup, Row, FloatingLabel } from 'react-bootstrap';
import { message } from 'antd';
import axiosInstance from '../../common/AxiosInstance';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import AllWorkoutPlans from './AllWorkoutPlans';

const WorkoutPlans = () => {
   const [workoutDetails, setWorkoutDetails] = useState({
      title: '',
      image: "",
      targetMuscles: '',
      description: "",
      duration: 0,
      trainerId: localStorage.getItem("userId"),
      trainer: localStorage.getItem("username")
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setWorkoutDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };


   const handleSubmit = (e) => {
      e.preventDefault();

      axiosInstance.post('/add-workout-plan', workoutDetails)
         .then((res) => {
            message.success("Workoutplan added successfully");
            setWorkoutDetails({
               title: '',
               image: "",
               targetMuscles: '',
               description: "",
               duration: 0,
               trainerId: localStorage.getItem("userId"),
               trainer: localStorage.getItem("username")
            });
         })
         .catch((error) => {
            message.error(error.message);
            console.error('Error adding Item:', error);
         });
   };

   return (
      <Container>

         <div className="layout">
            <div className="left">
               <h1 className='text-center text-light '>Workout Plans</h1>
            </div>
            <div className="left">
               <Form
                  style={{ padding: '25px' }}
                  onSubmit={handleSubmit}>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <Form.Label>Workout Title</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="title"
                              required
                              name='title'
                              value={workoutDetails.title}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <Row className="mb-3">   
                     <Form.Group as={Col} md="12">
                     <Form.Label>Target Muscles</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="target muscles"
                              required
                              name='targetMuscles'
                              value={workoutDetails.targetMuscles}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>

                  <Row className="mb-3">   
                     <Form.Group as={Col} md="6">
                     <Form.Label>Image Url</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="Image url"
                              required
                              name='image'
                              value={workoutDetails.image}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>

                     <Form.Group as={Col} md="6">
                     <Form.Label>Duration (in days)</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="duration"
                              required
                              name='duration'
                              value={workoutDetails.duration}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
              
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <FloatingLabel>Description</FloatingLabel>
                        <Form.Control name='description' value={workoutDetails.description} onChange={handleChange} as="textarea" rows={3} />
                     </Form.Group>
                  </Row>
                  <div className="d-flex justify-content-center my-5">
                     <Button variant='contained' size="large" type='submit' startIcon={<AddIcon />}>
                        Add Workout
                     </Button>
                  </div>
               </Form>
            </div>
         </div>
         <AllWorkoutPlans />
      </Container>
   )
}

export default WorkoutPlans;
