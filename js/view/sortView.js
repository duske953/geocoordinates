import arraySort from "array-sort";
import { state } from '../model/searchModel';
const sectionBoxSelect = document.querySelector(".section-box__select");
import { renderLocations } from "./paginationView";

/**
 *
 *Function to sort the searchedLocations
 * @param {Boolean} option option to sort in the reverse order or not
 * @return {Object} The sorted location
 */
function sortLocations(option) {
  return arraySort(renderLocations(), "distance", {
    reverse: option,
  });
}

/**
 *Funtion to render the newly sorted Searchedlocations when the "select" tag is changed
 *
 * @export
 * @param {*} handler
 */
export function renderSectionBoxSelect(handler) {
  let sortedLocations; // the sorted searchedLocation
  sectionBoxSelect.addEventListener("change", (e) => {
    if(state.destinationLocations.candidates.length === 0) return;
    if (e.target.value === "By furthest")
      sortedLocations = sortLocations(false);
    if (e.target.value === "By nearest") sortedLocations = sortLocations(true);
    handler(sortedLocations);
  });
}
