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

const beer = {
  find(beerId) {
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
  },
  // Now we are going to create a function that will allow our users
  // to search for a beer they'd like to review.
  search(beerName) {
    // first clean up the query so that it can be parsed into the URL
    const query = beerName.split(' ').join('+');
    // construct a promise that returns our search results. It takes a similar format
    // to the findBeer function
    return new Promise((resolve, reject) => {
      rp(`${BASE_URL}/search?q=${query}&key=${KEY}&type=beer`)
        .then((res) => JSON.parse(res))
        .then((res) => {
          // if the server returns no data, resolve with a message
          if (res.data === undefined) resolve('No data');
          // We want to limit the returned search results to only the top 10
          res.data.splice(10, res.totalResults);
          // Now format each result to look like our schema
          const results = res.data.map((result) => {
            const { id, name, description, abv, glasswareId, style } = result;
            const beerData = { id, name, description, abv, glasswareId, style: style.name };
            // If the beer does not have a label image, let's replace it with a
            // default image of our choosing. If it does, use that image
            if (!result.labels) beerData.label = 'http://www.kilduffs.com/Beer_116_Baltimore_FredBauernschmidtsAmericanBreweryBeer_Label.jpg';
            else beerData.label = result.labels.large;
            // return our formatted beer result
            return beerData;
          });
          resolve(results);
        })
        .catch((err) => reject(err));
    });
  },
};

export default beer;
