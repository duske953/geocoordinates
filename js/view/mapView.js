import { loadModules, setDefaultOptions } from "esri-loader";
import { selectors } from "../controller/selectors";
import { fetchLocationDetailsFromLocalStorage } from "../controller/localStorageController";
setDefaultOptions({
  css: "https://js.arcgis.com/4.24/@arcgis/core/assets/esri/themes/dark/main.css",
});

import { state } from "../model/searchModel";
import { removeElement, watchPosition } from "./utilityView";

let path;
/**
 *Function that shows the routes(a graphic) between two position coordinates
 *
 * @param {Number} userLat The user's current latitude
 * @param {Number} userLng The usur's current longitude;
 * @param {Number} locationLat The latitude of the location we are visiting
 * @param {Number} locationLng The longitude of the location we are visiting
 */
async function getRoute(userLat, userLng, locationLat, locationLng) {
  const [RouteParameters, route, Stop, Collection] = await loadModules([
    "esri/rest/support/RouteParameters",
    "esri/rest/route",
    "esri/rest/support/Stop",
    "esri/core/Collection",
  ]);

  const stops = new Collection([
    new Stop({
      geometry: {
        x: userLng,
        y: userLat,
      },
    }),
    new Stop({
      geometry: { x: locationLng, y: locationLat },
    }),
  ]);

  const routeParams = new RouteParameters({
    stops,
  });

  const routeUrl =
    "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

  const data = await route.solve(routeUrl, routeParams);
  path = data.routeResults[0];
  path.route.symbol = {
    type: "simple-line",
    color: [5, 150, 255],
    width: 4,
  };

  state.mapView.graphics.add(path.route); // adding the graphics to the map;
}

let pointLocationGraphic;

/**
 *overall Function that calls the "getRoute" method and displays a dot on the map with the given location coordinates and also displays the routes between two points
 *
 * @export
 * @param {String} longitude The longitude of the location we are going/visiting
 * @param {String} latitude The latitude of the location we are going/visiting
 */
export async function routePath(longitude, latitude) {
  watchPosition();
  const [Graphic] = await loadModules(["esri/Graphic"]);

  if (path) {
    state.mapView.graphics.remove(path.route);
    path = undefined;
  } // making sure ther's only one route linking two points on the map;

  if (pointLocationGraphic) {
    state.mapView.graphics.remove(pointLocationGraphic);
  } // making sure there's only one point of the location we are visiting

  const pointLocation = {
    type: "point",
    longitude,
    latitude,
  }; // the coordinates points of the location we are visiting;

  const userPoint = {
    type: "point",
    longitude: state.coordinates.longitude,
    latitude: state.coordinates.latitude,
  }; // the user's current coordinates points

  const pointLocationSymbol = {
    type: "simple-marker",
    size: "20px",
    color: [224, 49, 49], // Orange
    outline: {
      color: [255, 255, 255], // White
      width: 1,
    },
  };

  // go to the given point

  pointLocationGraphic = new Graphic({
    geometry: pointLocation,
    symbol: pointLocationSymbol,
  });

  const userLocationGraphic = new Graphic({
    geometry: userPoint,
    symbol: pointLocationSymbol,
  });
  state.mapView.graphics.add(pointLocationGraphic);

  state.mapView.goTo([userLocationGraphic, pointLocationGraphic], {
    duration: 5000,
  }); // zooming the map to cover all points on the map;

  getRoute(
    state.coordinates.latitude,
    state.coordinates.longitude,
    latitude,
    longitude
  );
}

let track;
let trackGraphic;
/**
 *Function to track the user's location
 *
 */
async function trackUserLocation() {
  const [Graphic, Track] = await loadModules([
    "esri/Graphic",
    "esri/widgets/Track",
  ]);
  // if (track) {
  //   track.destroy();
  // }
  track = new Track({
    view: state.mapView,
    scale: 10000,
    goToLocationEnabled: true,
    graphic: new Graphic({
      symbol: {
        type: "simple-marker",
        size: "20px",
        color: "green",
        outline: {
          color: "#efefef",
          width: "1.5px",
        },
      },
    }),
    useHeadingEnabled: true,
  });
  // if (state.mapView.graphics.toArray().length === 2) getRoute();

  state.mapView.when(
    function (res) {
      removeElement(selectors.spinnerContainer); // removing the spinner once the map loads(when it's ready)
      fetchLocationDetailsFromLocalStorage();
      track.start();
      track.on("track", (res) => {});
    },
    function err() {
      return true;
    }
  );
}
/**
 *Function to displaymap in the ui
 *
 * @export
 * @param {String} latitude The current user latitude
 * @param {String} longitude The current user longitude;
 */
export async function displayMap(latitude, longitude) {
  const [Map, MapView, esriConfig] = await loadModules([
    "esri/Map",
    "esri/views/MapView",
    "esri/config",
  ]);
  esriConfig.apiKey =
    `${process.env.API_KEY}`
  state.map = new Map({
    basemap: "arcgis-navigation-night", // Basemap layer service
  });

  state.mapView = new MapView({
    map: state.map,
    center: [longitude, latitude], // Longitude, latitude
    zoom: 12, // Zoom level
    container: selectors.mapBox, // Div element
  });
  await trackUserLocation();
}
