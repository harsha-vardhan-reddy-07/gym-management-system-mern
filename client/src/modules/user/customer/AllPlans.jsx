import React from 'react'
import AllWorkoutPlans from '../trainer/AllWorkoutPlans'
import AllMonthlyPlans from '../../admin/AllMonthlyPlans'

const AllPlans = () => {
   return (
      <div>
         <div className='second-container'>
            <div>
               <h1 className='m-3 text-center text-light'>All Workout Plans</h1>
               <AllWorkoutPlans />


            </div>
         </div>
         <div className='second-container'>
            <div>
               <h1 className='m-3 text-center text-light'>All Monthly Subscription plans</h1>
               <AllMonthlyPlans />
            </div>
         </div>
      </div>
   )
}

export default AllPlans
