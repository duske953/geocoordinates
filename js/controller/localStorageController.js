import { state } from "../model/searchModel";
import { handleLocationDetails } from "./searchController";
import { selectors } from "./selectors";

/**
 *Function to store the place we searched for in local storage
 *
 * @export
 * @return {*}
 */
export function storeLocationsInLocalStorage() {
  if (Object.entries(state.place).length === 0) return;
  localStorage.setItem("place", JSON.stringify(state.place));
}

/**
 * *Function to get the place we searched for from local storage
 *
 * @export
 * @return {*}
 */
export function fetchLocationDetailsFromLocalStorage() {
  const place = JSON.parse(localStorage.getItem("place"));
  if (!place) return;
  state.place = place;
  handleLocationDetails(place); // making another request to their api
  // selectors.locationContainer.classList.add("section-box__locations--active");
}
