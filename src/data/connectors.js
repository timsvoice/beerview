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
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to your MongoDB, but not when in TEST mode
if (process.env.NODE_ENV !== 'TEST') {
  const mongo = Mongoose.connect(MONGODB_URI);
}

// We're going to use MongoDB to store our user generated reviews
// so we need to create a review schema using Mongoose. Your schema
// should consist of a beerId, rating, and location, all of which are required.
const ReviewSchema = Mongoose.Schema({
  beerId: { type: String, required: true },
  rating: { type: Number, required: true },
  location: { type: String, required: true },
});

// Now we need to expose our reviews so we can fetch data and
// add new reviews to the DB
const Review = Mongoose.model('reviews', ReviewSchema);

// Once we have the local database serving up our reviews
// and we can create reviews using a Mutator, we need to
// fetch some tasty data from the breweryDB database.

export { Review };
