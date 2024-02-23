import accessDeniedImg from "url:../../img/undraw_access_denied_re_awnf.svg";
import {
  displayError,
  removeElement,
  watchPosition,
} from "../view/utilityView";
import { state } from "../model/searchModel";
import { selectors } from "./selectors";
import { displayMap } from "../view/mapView";

/**
 *
 *
 * @export
 * @param {Object} pos The position object gotten from the browswer
 */
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
  const html = `<div><img class="img__error" src=${accessDeniedImg} alt="img representing access denied"></img><p>This app relies heavily on your location to work properly. Without it, the app will not be usable. Please grant location access to proceed.</p></div>`;
  displayError(selectors.imgErrorContainer, html);
}
