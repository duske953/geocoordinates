import { loadModules, setDefaultOptions } from "esri-loader";
import { selectors } from "../controller/selectors";
import { fetchLocationDetailsFromLocalStorage } from "../controller/localStorageController";
setDefaultOptions({
  css: "https://js.arcgis.com/4.24/@arcgis/core/assets/esri/themes/dark/main.css",
});

import { state } from "../model/searchModel";
import { removeElement, watchPosition } from "./utilityView";

let path;
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

  // if (Object.entries(state.routePath).length !== 0) {
  //   console.log(state.routePath);
  //   state.mapView.graphics.remove(state.routePath);
  // }

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

  state.mapView.graphics.add(path.route);
}

let pointLocationGraphic;

export async function routePath(longitude, latitude) {
  watchPosition();
  const [Graphic] = await loadModules(["esri/Graphic"]);

  if (path) {
    state.mapView.graphics.remove(path.route);
    path = undefined;
  }

  if (pointLocationGraphic) {
    state.mapView.graphics.remove(pointLocationGraphic);
  }

  const pointLocation = {
    type: "point",
    longitude,
    latitude,
  };

  const userPoint = {
    type: "point",
    longitude: state.coordinates.longitude,
    latitude: state.coordinates.latitude,
  };

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
  });

  getRoute(
    state.coordinates.latitude,
    state.coordinates.longitude,
    latitude,
    longitude
  );
}

let track;
let trackGraphic;
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
      fetchLocationDetailsFromLocalStorage();
      track.start();
      track.on("track", (res) => {});
    },
    function err() {
      return true;
    }
  );
}

export async function displayMap(latitude, longitude, location) {
  const [Map, MapView, esriConfig] = await loadModules([
    "esri/Map",
    "esri/views/MapView",
    "esri/config",
  ]);
  esriConfig.apiKey =
    "AAPK6f1f10425a4947c9a2bc22cf9657f53esuOFoaKEqM96GD1-T1wQPiTSaOvAr7AV4re7uwL3aJwMUsQm94bfQfLqW92UaLIj";
  state.map = new Map({
    basemap: "arcgis-navigation-night", // Basemap layer service
  });

  state.mapView = new MapView({
    map: state.map,
    center: [longitude, latitude], // Longitude, latitude
    zoom: 12, // Zoom level
    container: selectors.mapBox, // Div element
  });
  removeElement(selectors.spinnerContainer);
  await trackUserLocation();
  // addPointToMap(longitude, latitude);
}
