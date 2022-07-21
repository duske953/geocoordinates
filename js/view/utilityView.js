const spinner = document.querySelector(".spinner-container");
import { state } from "../model/searchModel";
import { selectors } from "../controller/selectors";
export function displaySpinner(parentElement) {
  // removeElement(parentElement);
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

export function displayError(parentElement, msg) {
  removeElement(parentElement);
  parentElement.insertAdjacentHTML("afterbegin", msg);
}

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

export function watchPosition() {
  navigator.geolocation.getCurrentPosition(position, error, {
    enableHighAccuracy: true,
  });
}

export function addUtilityClass(parentElement, classList) {
  parentElement.classList.add(classList);
}

export function removeUtiliyClass(parentElement, classList) {
  parentElement.classList.remove(classList);
}

export function errorTimeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return reject({ name: "timeOut" });
    }, 15000);
  });
}

export function imgHtml(message) {
  const html = `<div class = "section-box__locations-img-box">
            <img class="section-box__locations-img" src="/undraw_no_data_re_kwbl.7495cdc4.svg" alt="img representing no data">
     <p class = "p-para">${message}</p>
    </div>
    `;
  return html;
}
