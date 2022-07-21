import { state } from "../model/searchModel";
import { handleLocationDetails } from "./searchController";
import { selectors } from "./selectors";
export function storeLocationsInLocalStorage() {
  if (Object.entries(state.destinations).length === 0) return;
  localStorage.setItem("place", JSON.stringify(state.destinations));
}

export function fetchLocationDetailsFromLocalStorage() {
  const place = JSON.parse(localStorage.getItem("place"));
  if (!place) return;
  state.destinations = place;
  handleLocationDetails(state.destinations);
  selectors.locationContainer.classList.add("section-box__locations--active");
}
