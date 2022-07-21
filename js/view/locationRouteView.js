import date from "date-and-time";
import { removeUtiliyClass } from "./utilityView";
import { selectors } from "../controller/selectors";
import { state } from "../model/searchModel";

/**
 *A function to display routes that leads to a specifc direction
 *
 * @export
 * @param {Object} routes An object of routes that leads to a specific location
 * @param {Object} currentDestination The data of the location searched for
 * @return {*}
 */
export function displayRoute(routes, currentDestination) {
  const now = new Date();
  const { directions } = routes;
  if (!directions) return;
  const { features } = directions[0];
  selectors.routeBox.innerHTML = "";
  features.forEach((el) => {
    const direction = el.attributes.text;
    const timeOfArrival = date.format(new Date(el.attributes.ETA), "hh:mm");
    const presentDate = date.format(new Date(), "hh:mm");
    let eta = timeOfArrival.slice(-2) - presentDate.slice(-2);
    eta = eta < 0 ? (eta = 0) : eta;
    const html = `<li class = "route-directions">
    <p class="direction">${direction}</p>
    <p class = "eta"><span>Estimated arrival time: </span><span>${eta} minute(s)</span></p>
    </li>`;
    selectors.routeBox.insertAdjacentHTML("beforeend", html);
  });
  const goBackIcon = `<ion-icon class = "arrow-icon" name="arrow-back-outline"></ion-icon>`;
  const heading = `<p class = "currentdestination">${currentDestination.address}</p>`;
  selectors.routeBox.insertAdjacentHTML("afterbegin", goBackIcon);
  selectors.routeBox.insertAdjacentHTML("afterbegin", heading);
}
/**
 *Function to hide the routes
 *
 * @export
 * @param {Function} handler A function that get's executed when the "arrow icon" is clicked
 */
export function hideRoutes(handler) {
  selectors.routeBox.addEventListener("click", (e) => {
    if (!e.target.classList.contains("arrow-icon")) return;
    removeUtiliyClass(selectors.sectionBoxSelect, "d-none");
    setTimeout(() => {
      state.currentDestination.placeElement.scrollIntoView({
        behavior: "smooth",
      });
    }, 500);
    handler();
  });
}
