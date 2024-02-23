import {
  displaySpinner,
  displayError,
  removeElement,
  removeUtiliyClass,
  errorTimeout,
  imgHtml,
} from "../view/utilityView";
import { state, fetchLocationDetails } from "../model/searchModel";
import { paginationView, renderLocations } from "../view/paginationView";
import { displayLocations } from "../view/locationView";
import { selectors } from "./selectors";
import { storeLocationsInLocalStorage } from "./localStorageController";

/**
 *
 * Function that controls getting the locations from a given place
 * @param {Object} place An object of the place we are trying to search
 */
export async function handleLocationDetails(place) {
  storeLocationsInLocalStorage();
  if (
    place.place === state.destinationLocations.place &&
    Object.entries(state.destinationLocations).length !== 0
  ) {
    removeUtiliyClass(selectors.locationContainer, "section-locations__active");
    return;
  }

  try {
    displaySpinner(selectors.locationItemsBox);
    await Promise.race([errorTimeout(), fetchLocationDetails(place)]);
    selectors.sectionBoxSelect.selectedIndex = 0;
    removeElement(selectors.spinnerLocations);
    paginationView();
    displayLocations(renderLocations(), state.place.placeReference);
  } catch (err) {
    removeUtiliyClass(
      selectors.paginationBox,
      "section-box__pagination--active"
    );
    if (err.name === "timeOut" || err.message === "Network Error")
      return displayError(
        selectors.locationItemsBox,
        imgHtml("Something went wrong with the request")
      );
    else
      return displayError(
        selectors.locationItemsBox,
        imgHtml(`We couldn't find any ${place.place} locations near you`)
      );
  }
}
