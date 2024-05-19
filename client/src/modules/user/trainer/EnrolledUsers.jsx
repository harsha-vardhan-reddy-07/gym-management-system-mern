import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../common/AxiosInstance';
import { Button } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

const EnrolledUsers = () => {

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
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell align="center">User Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Workout Title</TableCell>
                  <TableCell align="center">Joined Date & Time</TableCell>
                  <TableCell align="center">Status</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {workoutPlans.map((workout) => (
                  <TableRow
                     key={workout._id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {workout._id}
                     </TableCell>
                     <TableCell align="center">{workout.username}</TableCell>
                     <TableCell align="center">{workout.email}</TableCell>
                     <TableCell align="center">{workout.title.slice(0,35)}...</TableCell>
                     <TableCell align="center">{workout.startDate.slice(0,10)}</TableCell>
                     <TableCell align="center">{workout.status}</TableCell>
          
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

export default EnrolledUsers


