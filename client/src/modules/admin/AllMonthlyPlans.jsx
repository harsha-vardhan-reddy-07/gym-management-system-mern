import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Spinner, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../common/AxiosInstance';
import { message } from 'antd';
import { UserContext } from "../../App"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const AllMonthlyPlans = () => {
   const [items, setItems] = useState([]);

  
  
   const allItems = async () => {
      try {
            await axiosInstance.get('/fetch-monthly-plans').then((res)=>{

            setItems(res.data);
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      allItems();
   }, []);



   const joinPlan = async (id) => {
      try {
         await axiosInstance.post('/join-monthly-plan', {userId: localStorage.getItem("userId"), planId: id}).then((res)=>{
         setItems(res.data);
      });
   } catch (error) {
      console.log(error);
   }
   }
   

   const deleteItem = async (id) => {
      const sure = confirm("Are you sure to delete this item?");
      if (!sure) return;
      try {
         await axiosInstance.delete(`/delete-monthly-plan/${id}`).then((res) => {
            message.success(res.data.message)
            allItems();
         });

      } catch (error) {
         console.log(error.message)
      }
   }

   return (
      <Container>
         {/* <h1 className='my-5 text-center text-light'>All Monthly Plans</h1> */}
    
         <div className="all-items mt-5">

            {items.length > 0 && items.map((item) => (
               
                  <Card sx={{ maxWidth: 345 }}>
                     <CardMedia
                        sx={{ height: 140 }}
                        image={item.image}
                        title={item.title}
                     />
                     <CardContent>
                        <Typography gutterBottom variant="h5" color="text.secondary" component="div">
                        {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                           <b style={{color: 'black'}}>Amount: </b>{item.amount}/-
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           <b style={{color: 'black'}} >Duration: </b> {item.duration} days
                        </Typography>
                        <Typography className='mt-2' variant="body2" color="text.secondary">
                           {item.description}
                        </Typography>
                     </CardContent>
                     {localStorage.getItem('usertype') === 'Admin' &&
                     <CardActions>
                        <Button size="small" onClick={()=> deleteItem(item._id)} >Remove plan</Button>
                     </CardActions>
                     }
                     {localStorage.getItem('usertype') === 'Customer' && !item.subscribers.includes(localStorage.getItem('userId')) &&
                     <CardActions>
                        <Button size="small" onClick={()=> joinPlan(item._id)} >Join plan</Button>
                     </CardActions>
                     }
                     {localStorage.getItem('usertype') === 'Customer' && item.subscribers.includes(localStorage.getItem('userId')) &&
                     <CardActions>
                        <Button size="small" >Already joined</Button>
                     </CardActions>
                     }
                  </Card>
            ))}

         </div>
      </Container>
   );
};

export default AllMonthlyPlans;
