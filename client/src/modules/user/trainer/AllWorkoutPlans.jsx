import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Spinner, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../../common/AxiosInstance';
import { message } from 'antd';
// import { UserContext } from "../../App"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const AllWorkoutPlans = () => {

   const [workoutPlans, setWorkoutPlans] = useState([]);

   const allWorkouts = async () => {
      try {
         const res = await axiosInstance.get('/fetch-workout-plans');
         setWorkoutPlans(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      allWorkouts();
   }, []);

  


   const deleteItem = async (id) => {
      const sure = confirm("Are you sure to delete this item?");
      if (!sure) return;
      try {
         await axiosInstance.delete(`/delete-workout-plan/${id}`).then((res) => {

            message.success("Workout plan deleted successfully!")
            allWorkouts();
         }).catch((error) => {

            message.error("Something went wrong! Please try again later.")
         });
         
      } catch (error) {
         console.log(error.message)
      }
   }


   const joinPlan = async (id) => {
      await axiosInstance.post(`/join-workout-plan`, {userId: localStorage.getItem("userId"), planId: id}).then((res) => {

         message.success("successfully!")
         allWorkouts();
      }).catch((error) => {

         message.error("Something went wrong! Please try again later.")
      });
   }

   const markFinish = async (id) => {
      await axiosInstance.get(`/finish-workout-plan/${id}`).then((res) => {
         message.success("Workout plan conpleted successfully!")
         allWorkouts();
      }).catch((error) => {

         message.error("Something went wrong! Please try again later.")
      });
      
   }
   
   const markDiscontinue = async (id) => {
      await axiosInstance.get(`/discontinue-workout-plan/${id}`).then((res) => {
         message.success("Workout plan discontinued successfully!")
         allWorkouts();
      }).catch((error) => {

         message.error("Something went wrong! Please try again later.")
      });
   }  
   return (
      <Container>

         <div className="all-items mt-5">

            {workoutPlans.length > 0 && workoutPlans.map((item, index) => (

               <Card key={index} sx={{ maxWidth: 345 }}>
                  <CardMedia
                     sx={{ height: 200 }}
                     image={item.image}
                     title={item.title}
                  />
                  <CardContent>
                     <Typography gutterBottom variant="b" color="text.primary" component="div">
                        {item.title}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       <b style={{color: 'black'}} >Duration:</b>  {item.duration}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       <b style={{color: 'black'}} >Trainer:</b>  {item.trainer}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       <b style={{color: 'black'}} >Target muscles:</b>  {item.targetMuscles}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        {item.description}
                     </Typography>

                  </CardContent>
                 
                     {localStorage.getItem("userId") === item.trainerId && (
                         <CardActions>
                        <Button size="small" onClick={()=> deleteItem(item._id)} >Remove</Button>
                        </CardActions>
                     )}
                     {localStorage.getItem("usertype") === "Customer" && !item.subscribers.includes(localStorage.getItem("userId")) &&(
                         <CardActions>
                        <Button size="small" onClick={()=> joinPlan(item._id)} >Join</Button>
                        </CardActions>
                     )}
                     {localStorage.getItem("usertype") === "Customer" && item.subscribers.includes(localStorage.getItem("userId")) &&(
                         <CardActions>
                        <Button size="small" onClick={()=> markFinish(item._id)} >Mark as Finished</Button>
                        <Button size="small" onClick={()=> markDiscontinue(item._id)} >Discontinue</Button>
                        </CardActions>
                     )}
                  
               </Card>
            ))}
         </div>
      </Container>
   );
};

export default AllWorkoutPlans;