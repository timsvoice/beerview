/* eslint-disable consistent-return, no-unused-vars */

// We're going to be making HTTP calls to the
// breweryDB so we need a simple way to do that.
import rp from 'request-promise';
import _ from 'underscore';
// Here, we setup a few consts to make our request
// composition simpler and easier to read.
// set the BASE_URL of the API, and once you have setup a free BreweryDB account
// store your API key in an env variable.
// We'll also set a defualt beer label if brewerydb doesn't have one for a particular beer
const BASE_URL = 'http://api.brewerydb.com/v2';
const KEY = process.env.BREWDB;
const defaultLabel = 'http://www.kilduffs.com/Beer_116_Baltimore_FredBauernschmidtsAmericanBreweryBeer_Label.jpg';

// Our Beer object will contain all the methods we'll use:
// A method for manipulating the data returned from the API
// A methid for finding a beer by id
// A methid for searching for beer by name
const Beer = {
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
          // If the beer does not have a label image, let's replace it with a
          // default image of our choosing.
          const beerData = _.defaults(res.data, { labels: { large: defaultLabel } });
          // if we have our beerData, then resolve the promise
          resolve(beerData);
        })
        .catch((err) => reject(err));
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
          if (res.data === undefined) reject('No data');
          // We want to limit the returned search results to only the top 10
          res.data.splice(10, res.totalResults);
          // Now format each result to look like our schema
          const results = res.data.map((result) => {
            const { id, name, description, abv, glasswareId, style, labels } = res.data;
            const beerData = _.defaults(res.data, { labels: { large: defaultLabel } });
            return beerData;
          });
          resolve(results);
        })
        .catch((err) => reject(err));
    });
  },
};

export default Beer;
