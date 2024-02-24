import { state } from "../model/searchModel";
import {removeUtilityClass } from "./utilityView";
import { selectors } from "../controller/selectors";
import { handleHidingRoutes } from "../controller/locationRouteController";

/**
 *
 *Function to open the modal box
 * @export
 *
 */
export function modal() {
  selectors.btnModal.addEventListener("click", (e) => {
    selectors.locationBox.classList.add("section-locations__active");
  });
}

/**
 *Function to to get the place from the modalBox and send to the "handler function" to process
 *
 * @export
 * @param {*} handler A function that get's executed when the a place in the modal view is clicked
 */
export function getPlaces(handler) {
  selectors.sectionPlaces.addEventListener("click", (e) => {
    e.preventDefault()
    if (!e.target.getAttribute("href")) return;
    const place = e.target.getAttribute("href").slice(1);
    const placeReference = e.target.parentElement.getAttribute("id");
    selectors.locationBox.classList.remove("section-locations__active");
    // selectors.locationContainer.firstElementChild.scrollIntoView({behavior:"smooth"})
    selectors.locationContainer.scrollTo(0,0)
    // selectors.locationContainer.style.zIndex = -1
  // selectors.sectionBoxSelect.scrollIntoView({behavior:"smooth"})
  // selectors.locationContainer.style.overflowY = "hidden"
    handleHidingRoutes();
    state.paginate = 1;

    state.place.place = place; // The place we are searching (ie cinema or gas station)
    state.place.placeReference = placeReference;
    removeUtilityClass(selectors.sectionBoxSelect, "d-none");
    handler(state.place);
  });
}
