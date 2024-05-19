import mongoose from "mongoose";

const users = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    usertype: String,
    workoutPlan: {
        type: Array,
        default: [],
    },
    subscription: String,
})

const equipment = mongoose.Schema({
    name: String,
    type: String,
    targetMuscles: String,
    quantity: Number,
    description: String,
    image: String,
})

const monthlyPlans = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    amount: Number,
    duration: Number,
    subscribers: {
        type: Array,
        default: [],
    }
})

const subscriptions = mongoose.Schema({
    userId: String,
    username: String,
    email: String,
    planId: String,
    planTitle: String,
    planAmount: Number,
    startDate: String,
    endDate: String,
})

const workoutPlans = mongoose.Schema({
    title: String,
    image: String,
    targetMuscles: String,
    trainerId: String,
    trainer: String,
    duration: Number,
    subscribers: {
        type: Array,
        default: [],
    },
})

const workoutPlanSubscription = mongoose.Schema({
    userId: String,
    username: String,
    email: String,
    planId: String,
    title: String,
    targetMuscles: String,
    trainerId: String,
    trainer: String,
    duration: Number,
    startDate: String,
    endDate: String,
    status: {
        type: String,
        default: 'In Progress',
    }
})


export const Users = mongoose.model('users', users);
export const Equipment = mongoose.model('equipment', equipment);
export const MonthlyPlans = mongoose.model('monthlyplans', monthlyPlans);
export const Subscriptions = mongoose.model('subscriptions', subscriptions);
export const WorkoutPlans = mongoose.model('workoutplans', workoutPlans); 
export const WorkoutSubscription = mongoose.model('workoutPlanSubscription', workoutPlanSubscription); 