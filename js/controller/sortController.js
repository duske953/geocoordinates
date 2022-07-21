import { state } from "../model/searchModel";
import { showMarkerOnPlace } from "../view/utilityView";
import { displayLocations } from "./../view/locationView";

export function handleSectionBoxSelect(sortedLocations) {
  displayLocations(sortedLocations, state.destinationLocations.placeReference);
}
