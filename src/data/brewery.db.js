/* eslint-disable consistent-return, no-unused-vars */

// We're going to be making HTTP calls to the
// breweryDB so we need a simple way to do that.
import rp from 'request-promise';

// Here, we setup a few consts to make our request
// composition simpler and easier to read

// set the BASE_URL to the following
const BASE_URL = 'http://api.brewerydb.com/v2';
// setup a free account with BreweryDB and create
// an environment variable with your unique key
const KEY = process.env.BREWDB;

// Once we have our basic URL consts, let's write a
// function that will return a beer based on an id we give it

const findBeer = (beerId) => {
  // We're going to use the es6 Promise object as a simple way
  // to turn our function into a Promise.
  return new Promise((resolve, reject) => {
    // es6 also allows us to write variables into our strings in the following way
    rp(`${BASE_URL}/beer/${beerId}?key=${KEY}`)
      // Parse the data into JSON
      .then((res) => JSON.parse(res))
      .then((res) => {
        // Using destructuring, we can extract just the data we want from the res
        // and then take that data and do some manipulation to get it
        // into the final format our schema expects
        const { id, name, description, abv, glasswareId, style, labels } = res.data;
        const beerData = {
          id,
          name,
          description,
          abv,
          glasswareId,
          style: style.name,
          label: labels.large,
        };
        // if we have our beerData, then resolve the promise
        resolve(beerData);
      })
      // remember to catch any errors and log them
      .catch((err) => console.log(err));
  });
};

export { findBeer };
