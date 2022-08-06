import noDataImg from "url:../../img/undraw_no_data_re_kwbl.svg";
import { state } from "../model/searchModel";
import { selectors } from "../controller/selectors";
export function displaySpinner(parentElement) {
  const spinner = document.querySelector(".spinner");
  if (spinner) spinner.remove();
  const html = `<div class="lds-dual-ring spinner"></div>`;
  parentElement.insertAdjacentHTML("afterbegin", html);
}

/**
 *function to remove element from the dom
 *
 * @export
 * @param {String || NODE} parentElement The parentElement of the child
 */
export function removeElement(parentElement) {
  parentElement.innerHTML = "";
}

/**
 *
 *Function to display error
 * @export
 * @param {Node || String} parentElement An html elment
 * @param {String} msg the error message
 */
export function displayError(parentElement, msg) {
  removeElement(parentElement);
  parentElement.insertAdjacentHTML("afterbegin", msg);
}

/**
 *Funtion to show the routes to a give location (manipulating the dom)
 *
 * @export
 */
export function showRoutes() {
  addUtilityClass(
    selectors.locationItemsBox,
    "section-box__locations-box-hidden"
  );
  addUtilityClass(
    selectors.routeContainer,
    "section-box__locations-route--active"
  );
  removeUtiliyClass(selectors.locationItemsBox, "p-events");
  selectors.locationItemsBox.scrollIntoView();
  document.querySelector("body").scrollIntoView();
  // addUtilityClass(selectors.locationContainer, "overflow-hidden");
  addUtilityClass(selectors.paginationBox, "d-none");
  setTimeout(() => {
    addUtilityClass(selectors.locationItemsBox, "d-none");
    selectors.nav.scrollIntoView({ behavior: "smooth" });
  }, 500);
  addUtilityClass(selectors.sectionBoxSelect, "d-none");
  removeUtiliyClass(selectors.utilityText, "u-para--active");
  addUtilityClass(
    selectors.locationContainer,
    "section-box__locations--active"
  );
}

/**
 *
 *Function to show marker on a give location => display marker on a html element
 * @export
 * @param {Node || String} currentDestination The html element to display the marker => The location that got clicked
 */
export function showMarkerOnPlace(currentDestination) {
  document
    .querySelectorAll(".section-box__locations-item--active")
    .forEach((el) => el.remove());
  currentDestination.insertAdjacentHTML(
    "beforeend",
    `<span class="section-box__locations-item--active">&nbsp;</span>`
  );
}

function position(pos) {
  const { latitude, longitude } = pos.coords;
  state.coordinates.latitude = latitude;
  state.coordinates.longitude = longitude;
}

function error() {
  return true;
}
/**
 *Function to get the current position of the user;
 *
 * @export
 */
export function watchPosition() {
  navigator.geolocation.getCurrentPosition(position, error, {
    enableHighAccuracy: true,
  });
}
/**
 *Function to add a class to an element
 *
 * @export
 * @param {String || Node} parentElement A html string
 * @param {String} classList The class that is added to the parentelement
 */
export function addUtilityClass(parentElement, classList) {
  parentElement.classList.add(classList);
}

export function removeUtiliyClass(parentElement, classList) {
  parentElement.classList.remove(classList);
}
/**
 *
 *Function that rejects immediately after a given amount of seconds using the promise api
 * @export
 * @return {*}
 */
export function errorTimeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return reject({ name: "timeOut" });
    }, 15000);
  });
}

/**
 *Function to display an image with a given message on the webpage
 *
 * @export
 * @param {String} message A message that describes the image
 * @return {String} retruns the html tag
 */
export function imgHtml(message) {
  const html = `<div class = "section-box__locations-img-box">
            <img class="section-box__locations-img" src=${noDataImg} alt="img representing no data">
     <p class = "p-para">${message}</p>
    </div>
    `;
  return html;
}
