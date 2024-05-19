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

const Trainers = () => {
   const [allUsers, setAllUsers] = useState([]);

   const getAllUsers = async () => {

    await axiosInstance.get('/fetch-users').then((res) => {
       
       setAllUsers(res.data.filter(user=> user.usertype === "Trainer"));
    }).catch( (error) => {
    console.log(error);
 })
};

useEffect(() => {
 getAllUsers();
}, []);

 

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Trainer ID</TableCell>
                  <TableCell align="center">Trainer Name</TableCell>
                  <TableCell align="center">Email</TableCell>
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
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

export default Trainers;

