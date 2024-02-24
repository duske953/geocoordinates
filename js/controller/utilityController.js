import { state } from '../model/searchModel';

function position(pos) {
    const { latitude, longitude } = pos.coords;
    state.coordinates.latitude = latitude
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

  export function errorTimeout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject({ name: "timeOut" });
      }, 15000);
    });
  }

