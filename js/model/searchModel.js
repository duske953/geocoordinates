const axios = require("axios");
import { watchPosition } from "../view/utilityView";
import { getDistance } from "geolib";
import { v4 as uuidv4 } from "uuid";
import { API_KEY } from "../controller/helpers";

export const state = {
  destinations: {},
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
 *Function to merge a unique id and the distance between the positions to each of the place location
 *
 * @param {Array || Object} arg An array ob object
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

async function getLocationDetails(category, coords) {
  if (!category && !coords) return;
  try {
    const locationData = await axios.get(
      `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=&category=${category.place}&location=${coords.longitude},${coords.latitude}&outfields=*&token=AAPK6f1f10425a4947c9a2bc22cf9657f53esuOFoaKEqM96GD1-T1wQPiTSaOvAr7AV4re7uwL3aJwMUsQm94bfQfLqW92UaLIj&f=json`
    );
    return locationData.data;
  } catch (err) {
    throw err;
  }
}

/**
 *
 *Function to get the list of place location that matches the place we searched for
 * @export
 * @param {Object} currentPlace An object of the place we are searching for
 * @return {*}
 */
export function fetchLocationDetails(currentPlace) {
  watchPosition();
  return new Promise(async (resolve, reject) => {
    try {
      const locationData = await getLocationDetails(
        currentPlace,
        state.coordinates
      );
      mergeDataToLocations(locationData);
      state.destinationLocations = locationData; // saving the received data in a state
      state.destinationLocations = Object.assign(
        state.destinationLocations,
        currentPlace
      );
      resolve(state.destinationLocations); // resolving the received locations
    } catch (err) {
      reject(err);
    }
  });
}
