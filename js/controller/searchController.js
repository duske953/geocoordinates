import {
  displaySpinner,
  displayError,
  removeElement,
  removeUtilityClass,
  imgHtml,
  addUtilityClass,
} from "../view/utilityView";
import { errorTimeout } from './utilityController';
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
  // if (
  //   place.place === state.destinationLocations.place &&
  //   Object.entries(state.destinationLocations).length !== 0
  // ) {
  //   removeUtiliyClass(selectors.locationContainer, "section-locations__active");
  //   return;
  // }

  try {
    displaySpinner(selectors.locationContainer);
    await Promise.race([errorTimeout(), fetchLocationDetails(place)]);
    if(state.destinationLocations.candidates.length === 0) throw error("Location not found")
    selectors.sectionBoxSelect.selectedIndex = 0;
    removeUtilityClass(selectors.sectionBoxSelect,"section-box__select--inactive")
    removeUtilityClass(selectors.locationContainer,"section-box__locations--inactive")
    document.querySelector(".spinner").remove()
    document.querySelector("footer").style.display = "block"
    paginationView();
    displayLocations(renderLocations(), state.place.placeReference);

      // selectors.locationContainer.style.zIndex = 2000

  } catch (err) {
    document.querySelector("footer").style.display = "none"
    addUtilityClass(selectors.sectionBoxSelect,"section-box__select--inactive")
    document.querySelector(".spinner").remove()
    removeUtilityClass(
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
