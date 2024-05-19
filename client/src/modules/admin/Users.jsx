import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../common/AxiosInstance';
import { Button } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

const Users = () => {
   const [allUsers, setAllUsers] = useState([]);

   const getAllUsers = async () => {

         await axiosInstance.get('/fetch-users').then((res) => {
            
            setAllUsers(res.data.filter(user=> user.usertype === "Customer"));
         }).catch( (error) => {
         console.log(error);
      })
   };

   useEffect(() => {
      getAllUsers();
   }, []);

   const handleStatus = async (id, status) => {
      try {
         const res = await axiosInstance.put("/api/admin/updatestatus", { id, status }, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
         })

         if (res.data.success) {
            message.success(res.data.message)
            getAllUsers()
         }
         else {
            message.error(res.data.message)
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell align="center">User Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Subscription Id</TableCell>
                  <TableCell align="center">WorkoutPlan Id</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {allUsers.map((user) => (
                  <TableRow
                     key={user._id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {user._id}
                     </TableCell>
                     <TableCell align="center">{user.username}</TableCell>
                     <TableCell align="center">{user.email}</TableCell>
                     <TableCell align="center">{user.subscription}</TableCell>
                     <TableCell align="center">{user.workoutPlan}</TableCell>

                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

export default Users

