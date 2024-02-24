import noDataImg from "url:../../img/undraw_no_data_re_kwbl.svg";
import { state } from "../model/searchModel";
import { selectors } from "../controller/selectors";
export function displaySpinner(parentElement,pos="absolute") {
  const spinner = document.querySelector(".spinner");
  if (spinner) spinner.remove();
  const html = `<div style=position:${pos} class="lds-dual-ring spinner"></div>`
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
  removeUtilityClass(
    selectors.routeContainer,
    "section-box__locations-route--inactive"
  );
  removeUtilityClass(selectors.locationItemsBox, "p-events");
  removeUtilityClass(selectors.utilityText, "u-para--active");
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

export function removeUtilityClass(parentElement, classList) {
  parentElement.classList.remove(classList);
}
/**
 *
 *Function that rejects immediately after a given amount of seconds using the promise api
 * @export
 * @return {*}
 */


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
