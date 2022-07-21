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
 *Function to send the searched place to the backend and process
 * @param {Object} currentPlace An object of the place we are trying to search
 */
export async function handleLocationDetails(currentPlace) {
  storeLocationsInLocalStorage();
  if (
    currentPlace.place === state.destinationLocations.place &&
    Object.entries(state.destinationLocations).length !== 0
  ) {
    removeUtiliyClass(selectors.locationContainer, "section-locations__active");
    return;
  }

  try {
    displaySpinner(selectors.locationItemsBox);
    await Promise.race([errorTimeout(), fetchLocationDetails(currentPlace)]);
    selectors.sectionBoxSelect.selectedIndex = 0;
    removeElement(selectors.spinnerLocations);
    paginationView();
    displayLocations(
      renderLocations(),
      state.destinationLocations.placeReference
    );
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
        imgHtml(`We couldn't find any ${currentPlace.place} near your location`)
      );
  }
}
