import { state } from "../model/searchModel";
import { displayLocations } from "./../view/locationView";

/**
 *
 *Function responsible for controlling the sorting locations by furthest or nearest
 * @export
 * @param {Object} sortedLocations An object of the sorted locations
 */
export function handleSectionBoxSelect(sortedLocations) {
  displayLocations(sortedLocations, state.destinationLocations.placeReference);
}
