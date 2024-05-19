import React, { useEffect, useState } from 'react'
import AllWorkoutPlans from '../trainer/AllWorkoutPlans'
import AllMonthlyPlans from '../../admin/AllMonthlyPlans'
import axiosInstance from '../../common/AxiosInstance';
import { Col, Container, Spinner, Modal, Form } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

const MyPlans = () => {

  const [monthlySubscriptions, setMonthlySubscriptions] = useState([]);

  const allMonthlySubscriptions = async () => {
     try {
        const res = await axiosInstance.get('/fetch-subscriptions');
        setMonthlySubscriptions(res.data.filter((item) => item.userId === localStorage.getItem("userId")));
     } catch (error) {
        console.log(error);
     }
  };

  useEffect(() => {
     allMonthlySubscriptions();
  }, []);


  const [workoutPlans, setWorkoutPlans] = useState([]);

  const allWorkouts = async () => {
     try {
        const res = await axiosInstance.get('/fetch-workout-subscriptions');
        setWorkoutPlans(res.data);
     } catch (error) {
        console.log(error);
     }
  };

  useEffect(() => {
     allWorkouts();
  }, []);




  return (
    <div>
         <div className='second-container'>
            <div>
               <h1 className='m-3 text-center text-light'>My Monthly Subscriptions</h1>
               <Container>

                  <div className="all-items mt-5">

                    {monthlySubscriptions.length > 0 && monthlySubscriptions.map((item, index) => (

                        <Card key={index} sx={{ maxWidth: 345 }}>

                          <CardContent>
                              <Typography gutterBottom variant="h6" color="text.primary" component="div">
                                {item.planTitle}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                <b style={{color: 'black'}} >Amount:</b>  {item.planAmount}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                <b style={{color: 'black'}} >Start Date:</b>  {item.startDate.slice(0,10)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                <b style={{color: 'black'}} >Expiry Date:</b>  {item.endDate.slice(0,10)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.description}
                              </Typography>

                          </CardContent>
                          

                          
                        </Card>
                    ))}
                  </div>
                  </Container>
            </div>
         </div>
         <div className='second-container'>
            <div>
               <h1 className='m-3 text-center text-light'>My Workout plans</h1>
               <Container>

         <div className="all-items mt-5">

            {workoutPlans.length > 0 && workoutPlans.map((item, index) => (

               <Card key={index} sx={{ maxWidth: 345 }}>
                  <CardContent>
                     <Typography gutterBottom variant="h6" color="text.primary" component="div">
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
                        <b style={{color: 'black'}} >Start Date:</b>  {item.startDate.slice(0,10)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <b style={{color: 'black'}} >End Date:</b>  {item.endDate.slice(0,10)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <b style={{color: 'black'}} >Status:</b>  {item.status}
                      </Typography>
                  </CardContent>
                 
 
                  
               </Card>
            ))}
         </div>
      </Container>
            </div>
         </div>
      </div>
  )
}

export default MyPlans