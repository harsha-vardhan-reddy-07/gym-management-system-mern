import React, { useEffect, useState } from 'react'
import { Col, Container, Spinner, Modal, Form } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import axiosInstance from '../common/AxiosInstance';

const MonthlySubscriptions = () => {

    const [monthlySubscriptions, setMonthlySubscriptions] = useState([]);

    const allMonthlySubscriptions = async () => {
       try {
          const res = await axiosInstance.get('/fetch-subscriptions');
          setMonthlySubscriptions(res.data);
       } catch (error) {
          console.log(error);
       }
    };
  
    useEffect(() => {
       allMonthlySubscriptions();
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
                                <b style={{color: 'black'}} >User Id:</b>  {item.userId}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                <b style={{color: 'black'}} >User Name:</b>  {item.username}
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
        
      </div>
  )
}

export default MonthlySubscriptions