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

const AllItems = () => {
   const user = useContext(UserContext)

   const [items, setItems] = useState([]);


   const allItems = async () => {
      try {
         await axiosInstance.get('/fetch-equipment').then((res) => {
            setItems(res.data);
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      allItems();
   }, []);



   const deleteItem = async (id) => {
      try {
         await axiosInstance.delete(`/delete-equipment/${id}`).then((res) => {
            message.success("Equipment deleted")
            allItems();
         });

      } catch (error) {
         console.log(error.message)
      }
   }

   return (
      <Container>
         <h1 className='my-5 text-center text-light'>All Equipments</h1>
         
         <div className="all-items mt-5">

            {items && items.length > 0 ? items.map((item, index) => (
                  <Card sx={{ maxWidth: 345 }} key={index} >
                     <CardMedia
                        sx={{ height: 300 }}
                        image={item.image}
                        title={item.name}
                     />
                     <CardContent>
                        <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                           {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {item.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           <b style={{color: 'black'}} >Equipment type:</b> {item.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           <b style={{color: 'black'}} >Quantity:</b> {item.quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        <b style={{color: 'black'}} >Target Muscles:</b>  {item.targetMuscles}
                        </Typography>
                     </CardContent>
                     {localStorage.getItem('role') === 'Admin' &&
                     <CardActions>
                        <Button size="small" onClick={()=> deleteItem(item._id)} >Remove Equipment</Button>
                     </CardActions>
                     }
                  </Card>
            ))
            : <p>No equipment</p>
            }

         </div>
      </Container>
   );
};

export default AllItems;