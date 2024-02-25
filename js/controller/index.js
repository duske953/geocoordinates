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
import { handlePaginationNext,handlePaginationPrev } from "./paginationController";
import { renderPaginationNext } from "./../view/paginationView";
import { renderPaginationPrev } from "./../view/paginationView";
import { pulltorefresh } from '@operato/pull-to-refresh'
import PullToRefresh from 'pulltorefreshjs';

import { renderSectionBoxSelect } from "../view/sortView";
import { OpenNavBar } from "../view/btnView";
import { selectors } from './selectors';

function renderNavBar() {
  return true;
}

PullToRefresh.init({
  mainElement:selectors.nav,
  triggerElement:selectors.nav,
  onRefresh(){
    window.location.reload()
  }
})


navigator.geolocation.getCurrentPosition(coordinates, errorCoordinates, {
  enableHighAccuracy: true,
  timeout: 15000,
});



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
