import 'dotenv/config'
import "core-js/stable";
import "regenerator-runtime/runtime";
import { coordinates, errorCoordinates } from "./mapController";
import { handleLocationDetails } from "./searchController";
import { handleSectionBoxSelect } from "./sortController";
import { displaySpinner } from "../view/utilityView";
import { hideRoutes } from "../view/locationRouteView";
import { handleHidingRoutes } from "./locationRouteController";
import { handleRouting } from "./locationRouteController";
import { modal, getPlaces } from "../view/modalView";
import { getCurrentSearchedLocation } from "./../view/locationView";
import { handlePaginationNext } from "./paginationController";
import { renderPaginationNext } from "./../view/paginationView";
import { handlePaginationPrev } from "./paginationController";
import { renderPaginationPrev } from "./../view/paginationView";
import { watchPosition } from './utilityController';
import { handleIntersection } from "./../view/utilityView";

import { renderSectionBoxSelect } from "../view/sortView";
import { OpenNavBar } from "../view/btnView";
import { state } from '../model/searchModel';
import { selectors } from './selectors';
const spinnerContainer = document.querySelector(".spinner-container--map");

function renderNavBar() {
  return true;
}




navigator.geolocation.getCurrentPosition(coordinates, errorCoordinates, {
  enableHighAccuracy: true,
  timeout: 15000,
});

// setInterval(() => {
// watchPosition()
// console.log(state.coordinates)
// },1000)

function init() {
  displaySpinner(selectors.mapBox,"fixed");
  getPlaces(handleLocationDetails);
  renderSectionBoxSelect(handleSectionBoxSelect);
  getCurrentSearchedLocation(handleRouting);
  hideRoutes(handleHidingRoutes);
  renderPaginationNext(handlePaginationNext);
  renderPaginationPrev(handlePaginationPrev);
  modal();
  OpenNavBar(renderNavBar);
}

init();
