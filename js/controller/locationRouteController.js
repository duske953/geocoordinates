import { displayRoute } from "../view/locationRouteView";
import { routePath } from "../view/mapView";
import { state } from "../model/searchModel";
import { selectors } from "./selectors";
import { errorTimeout, watchPosition } from './utilityController';
import {
  showRoutes,
  addUtilityClass,
  removeUtilityClass,
  showMarkerOnPlace,
} from "../view/utilityView";
import { handleCurrentSearchedLocation } from "../model/locationRouteModel";

/**
 *
 *Function to handle routing on the map
 * @export
 * @param {String} coords The coordinates of the place clicked;
 * @param {Object} place The data of the location searched for
 * @return {*}
 */
export async function handleRouting(coords, place, currentDestinationElement) {
  // setting pointer-events to none when location is clicked
  if (state.routes.place_id === place.place_id) {
    state.activeNav = 1;
    addUtilityClass(selectors.locationContainer,"section-box__locations--inactive")
    showRoutes();
    return;
  }
  try {
    selectors.utilityText.textContent = "Fetching directions...";
    addUtilityClass(selectors.utilityText, "u-para--active");
    addUtilityClass(selectors.locationItemsBox, "p-events");
    await Promise.race([
      errorTimeout(),
      handleCurrentSearchedLocation(coords, place),
    ]);
    // watchPosition()
    addUtilityClass(selectors.locationContainer,"section-box__locations--inactive")
    showMarkerOnPlace(currentDestinationElement);
    displayRoute(state.routes, place);
    showRoutes();
    state.activeNav = 1;
    const [lat, lng] = coords.split(",");
    routePath(lng, lat);
    state.location.longitude = lng;
    state.location.latitude = lat;
  } catch (err) {
    selectors.utilityText.textContent = "Someting went wrong";
    removeUtilityClass(selectors.locationItemsBox, "p-events");
    addUtilityClass(selectors.utilityText, "u-para--active");
    setTimeout(() => {
      removeUtilityClass(selectors.utilityText, "u-para--active");
    }, 500);
  }
}

/**
 *Function that handles execution of the hiding the route box;
 *
 * @export
 */
export function handleHidingRoutes() {
    removeUtilityClass(
      selectors.locationContainer, "section-box__locations--inactive"
    );
    addUtilityClass(
      selectors.routeContainer,
      "section-box__locations-route--inactive"
    );
}
