import {
  displayError,
  removeElement,
  watchPosition,
} from "../view/utilityView";
import { state } from "../model/searchModel";
import { selectors } from "./selectors";
import { displayMap } from "../view/mapView";
ken.src = require("./img/");

export async function coordinates(pos) {
  selectors.sectionBoxButton.removeAttribute("disabled", false);
  watchPosition();
  displayMap(state.coordinates.latitude, state.coordinates.longitude); // displaying a map with the currently fetched coordinates
}

/**
 *Funntion that executes when there was an error getting user's location
 *
 */
export function errorCoordinates(err) {
  removeElement(selectors.spinnerContainer);
  const html = `<img class="img__error" src="/undraw_no_data_re_kwbl.1d02a9de.svg" alt="img repreisenting access denied"></img>`;
  displayError(selectors.imgErrorContainer, html);
}
