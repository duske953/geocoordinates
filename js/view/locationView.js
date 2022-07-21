import { removeElement, displayError } from "./utilityView";
import { state } from "../model/searchModel";
import { selectors } from "../controller/selectors";
import { showMarkerOnPlace } from "./utilityView";
let category;
/**
 *
 *Function to render the searchedLocations to the ui
 * @export
 * @param {Array} locations An array of the searchedLocations
 * @param {Object} currentPlace The place searched for
 * @return {*} dislays the searchedLocations to the ui
 */

export function displayLocations(locations, currentPlace) {
  removeElement(selectors.locationItemsBox); // clearing the parent element when new locations is being added to the ui
  if (locations.length === 0 || !Array.isArray(locations)) {
    return displayError(
      selectors.locationItemsBox,
      `<img class="section-box__locations-img" src="img/undraw_no_data_re_kwbl.svg" alt="">`
    );
  }
  selectors.sectionBoxSelect.classList.remove("section-box__select--inactive");
  locations.forEach((location, i) => {
    const html = `
        <li class="section-box__locations-item" data-coords=${location.location.y},${location.location.x} data-id=${location.place_id}>
          <p class="section-box__address-1">
            ${location.address}
          </p>  
          <p class="section-box__address-2">
         ${location.attributes.Place_addr}
          </p>
          <div class="section-box__city-box">
            <p class = "section-box__distance">${location.distance}m from your current location</p>
          </div>
          
        </li>
      `;
    selectors.locationItemsBox.insertAdjacentHTML("afterbegin", html);
  });
  selectors.locationItemsBox.insertAdjacentHTML(
    "afterbegin",
    `<h2 class = "section-box__title">${currentPlace.split(".").at(-1)}</h2>`
  );
  if (state.currentDestination.placeElement) {
    const currentDestinationElementId =
      state.currentDestination.placeElement.getAttribute("data-id");
    const destinationElement = selectors.locationItemsBox.querySelector(
      `[data-id = "${currentDestinationElementId}"]`
    );
    if (!destinationElement) return;
    showMarkerOnPlace(destinationElement);
  }
}
/**
 *
 *Function that executes when one of the currently searhed locations is clicked or focused
 * @export
 * @param {Function} handler
 */
export function getCurrentSearchedLocation(handler) {
  selectors.locationItemsBox.addEventListener("click", (e) => {
    if (!e.target.closest(".section-box__locations-item")) return;
    state.currentDestination.place = state.destinationLocations.candidates.find(
      (el) =>
        el.place_id ===
        e.target.closest(".section-box__locations-item").getAttribute("data-id")
    );
    const coords = e.target
      .closest(".section-box__locations-item")
      .getAttribute("data-coords"); //getting the coords from the currently clicked location
    selectors.locationContainer.classList.remove(
      "section-box__locations--active"
    );
    state.currentDestination.placeElement = e.target.closest(
      ".section-box__locations-item"
    );
    handler(
      coords,
      state.currentDestination.place,
      state.currentDestination.placeElement
    );
  });
}
