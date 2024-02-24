const axios = require("axios");
import { watchPosition } from '../controller/utilityController';
import { getDistance } from "geolib";
import { v4 as uuidv4 } from "uuid";
import { API_KEY } from "../controller/helpers";

export const state = {
  place: {},
  coordinates: {},
  destinationLocations: {},
  destinationItems: [],
  currentDestination: {},
  map: {},
  mapView: {},
  marker: {},
  routePath: "",
  routes: {},
  location: {},
  paginate: 1,
  resultPerPage: 10,
  activeNav:0,
};

/**
 *
 *Function to get distance between the current user location and the place location
 * @param {Object} location An object of the coordinats (latitude,longitude)
 * @return {Number} The distance between the two positions
 */
function distanceBetweenCoordinates(location) {
  const distance = getDistance(
    {
      latitude: state.coordinates.latitude,
      longitude: state.coordinates.longitude,
    },
    {
      latitude: location.y,
      longitude: location.x,
    }
  );
  return distance;
}
/**
 *Function to merge a unique id and the distance between two coordinates (the user's coordinates and the locations coordinates)
 *
 * @param {Array || Object} arg An array of the locations of a given place;
 */
function mergeDataToLocations(arg) {
  arg.candidates.forEach((el) => {
    Object.assign(
      el,
      { distance: distanceBetweenCoordinates(el.location) },
      { place_id: uuidv4() }
    );
  });
}

/**
 *Function to get the locations data of a place
 *
 * @param {Object} category An object containing the place we are visiting (ie gas station or cinema)
 * @param {Object} coords An object of the user's current position coordinates
 * @return {Array} An array of the locations gotten from the api
 */
async function getLocationDetails(category, coords) {
  if (!category && !coords) return;
  try {
    const locationData = await axios.get(
      `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=&category=${category.place}&location=${coords.longitude},${coords.latitude}&outfields=*&token=${process.env.API_KEY}&f=json`
    );
    return locationData.data;
  } catch (err) {
    throw err;
  }
}

/**
 *
 *Function to get the list of place location that matches the place we searched for (ie cinema or gas station)
 * @export
 * @param {Object} place An object of the place destination we are searching for
 * @return {*}
 */
export function fetchLocationDetails(place) {
  watchPosition();
  return new Promise(async (resolve, reject) => {
    try {
      const locationData = await getLocationDetails(place, state.coordinates);
      mergeDataToLocations(locationData);
      state.destinationLocations = locationData; // saving the received data in a state
      state.destinationLocations = Object.assign(
        state.destinationLocations,
        place
      );
      resolve(state.destinationLocations); // resolving the received locations
    } catch (err) {
      reject(err);
    }
  });
}
