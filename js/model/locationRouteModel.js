import { state } from "./searchModel";
import axios from "axios";
import { watchPosition } from "../view/utilityView";

async function getLocationRoutes(locationCoords, userCoords) {
  const [lat, lng] = locationCoords.split(",");
  try {
    const routeData = await axios.get(
      `https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?f=json&travel_mode=driving&token=AAPK6f1f10425a4947c9a2bc22cf9657f53esuOFoaKEqM96GD1-T1wQPiTSaOvAr7AV4re7uwL3aJwMUsQm94bfQfLqW92UaLIj&startTime=now&returnDirections=true&stops=${userCoords.longitude},${userCoords.latitude};${lng},${lat}`
    );
    return routeData.data;
  } catch (err) {
    throw err;
  }
}

/**
 *Function that get the routeData that leads to a specific location
 *
 * @export
 * @param {String} coords The coordinates of the location searched for
 * @param {Object} place The data of the location searched for
 * @return {*}
 */
export function handleCurrentSearchedLocation(coords, place) {
  watchPosition();
  return new Promise(async (resolve, reject) => {
    try {
      const routes = await getLocationRoutes(coords, state.coordinates);
      state.routes = routes;
      state.routes = Object.assign(state.routes, place);
      resolve(state.routes);
    } catch (err) {
      reject(err);
    }
  });
}
