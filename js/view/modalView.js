import { state } from "../model/searchModel";
import { addUtilityClass, removeUtiliyClass } from "./utilityView";
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
 * @param {*} handler
 */
export function getPlaces(handler) {
  selectors.sectionPlaces.addEventListener("click", (e) => {
    if (!e.target.getAttribute("href")) return;
    const place = e.target.getAttribute("href").slice(1);
    const placeReference = e.target.parentElement.getAttribute("id");
    selectors.locationBox.classList.remove("section-locations__active");
    if (
      selectors.routeContainer.classList.contains(
        "section-box__locations-route--active"
      )
    )
      handleHidingRoutes();
    state.paginate = 1;

    state.destinations.place = place;
    state.destinations.placeReference = placeReference;
    addUtilityClass(
      selectors.locationContainer,
      "section-box__locations--active"
    );
    removeUtiliyClass(selectors.sectionBoxSelect, "d-none");
    handler(state.destinations);
  });
}
