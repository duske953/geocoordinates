import accessDeniedImg from "url:../../img/undraw_access_denied_re_awnf.svg";
import { watchPosition } from './utilityController';
import {
  displayError,
  removeElement,
  removeUtilityClass,
} from "../view/utilityView";
import { state } from "../model/searchModel";
import { selectors } from "./selectors";
import { displayMap } from "../view/mapView";
import { addUtilityClass } from '../view/utilityView';

/**
 *
 *
 * @export
 * @param {Object} pos The position object gotten from the browswer
 */
export async function coordinates(pos) {
  addUtilityClass(document.querySelector(".lds-dual-ring"),"pos-abs")
  removeUtilityClass(selectors.locationContainer,"section-box__locations--inactive")
  removeUtilityClass(selectors.sectionBoxNav,"section-box__nav--inactive")
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
  document.querySelector(".spinner").remove()
  const html = `<div><img class="img__error" src=${accessDeniedImg} alt="img representing access denied"></img><p class="img-error-text">This app relies heavily on your location to work properly. Without it, the app will not be usable. Please grant location access to proceed.</p></div>`;
  displayError(selectors.imgErrorContainer, html);
}
