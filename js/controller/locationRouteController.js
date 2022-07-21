import { displayRoute } from "../view/locationRouteView";
import { routePath } from "../view/mapView";
import { state } from "../model/searchModel";
import { selectors } from "./selectors";
import {
  showRoutes,
  addUtilityClass,
  removeUtiliyClass,
  errorTimeout,
  showMarkerOnPlace,
} from "../view/utilityView";
import { handleCurrentSearchedLocation } from "../model/locationRouteModel";

/**
 *
 *Function to handle routing on the map
 * @export
 * @param {String} coords The coordinates of the location searched for
 * @param {Object} currentDestination The data of the location searched for
 * @return {*}
 */
export async function handleRouting(
  coords,
  currentDestination,
  currentDestinationElement
) {
  // setting pointer-events to none when location is clicked
  if (state.routes.place_id === currentDestination.place_id) {
    showRoutes();
    return;
  }
  try {
    selectors.utilityText.textContent = "Fetching directions...";
    addUtilityClass(selectors.utilityText, "u-para--active");
    addUtilityClass(selectors.locationItemsBox, "p-events");
    await Promise.race([
      errorTimeout(),
      handleCurrentSearchedLocation(coords, currentDestination),
    ]);
    showRoutes();

    showMarkerOnPlace(currentDestinationElement);
    displayRoute(state.routes, currentDestination);

    const [lat, lng] = coords.split(",");
    routePath(lng, lat);
    state.location.longitude = lng;
    state.location.latitude = lat;
  } catch (err) {
    selectors.utilityText.textContent = "Someting went wrong";
    removeUtiliyClass(selectors.locationItemsBox, "p-events");
    addUtilityClass(selectors.utilityText, "u-para--active");
    setTimeout(() => {
      removeUtiliyClass(selectors.utilityText, "u-para--active");
    }, 3000);
  }
}

/**
 *Function that handles execution of the hiding the route;
 *
 * @export
 */
export function handleHidingRoutes() {
  removeUtiliyClass(selectors.locationItemsBox, "d-none");
  removeUtiliyClass(selectors.paginationBox, "d-none");

  removeUtiliyClass(selectors.locationContainer, "overflow-hidden");

  setTimeout(() => {
    removeUtiliyClass(
      selectors.locationItemsBox,
      "section-box__locations-box-hidden"
    );
    removeUtiliyClass(
      selectors.routeContainer,
      "section-box__locations-route--active"
    );
  }, 100);

  setTimeout(() => {
    selectors.nav.scrollIntoView({ behavior: "smooth" });
  }, 1500);
}
