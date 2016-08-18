/* eslint-disable no-unused-vars, new-cap */

// Go ahead an import mongoose
import Mongoose from 'mongoose';
// Set Mongoose promises to native promises. This is just the way it has to be
Mongoose.Promise = global.Promise;

// Because we're going to be using a local DB for development
// and a hosted DB for deployment on Heroku, we want to
// dynamically assign the MONGODB_URI so we can simply deploy
// our code without worring about breaking our MongoDB conneciton
// paste this command into your ~/.profile file (use nano ~/.profile)
// export MONGODB_URI=mongodb://localhost/<YOUR DB NAME>
// create a constant equal to the environment variable MONGODB_URI
// #hint: you can use process.env.<VARIABLE NAME> to access
// environment variables


// Connect to your MongoDB, but not when in TEST mode
// #hint use an if statement that tests the NODE_ENV
// environement variable and connects Mongoose
// if it's not equal to TEST


// We're going to use MongoDB to store our user generated reviews
// so we need to create a const ReviewSchema using Mongoose. Your schema
// should consist of a beerId, rating, and location, their corresponding types,
// all of which are required.
// #hint: Use the Mongoose.Schema({...}) method

// Now we need to expose our reviews so we can fetch data and
// add new reviews to the DB
const Review = Mongoose.model('reviews', ReviewSchema);

export { Review };
