import { selectors } from "../controller/selectors";
import { state } from '../model/searchModel';
import { addUtilityClass, removeUtilityClass } from "./utilityView";
export function OpenNavBar(handler) {
  selectors.btnLocations.addEventListener("click", (e) => {
    const btn = e.target.closest(".section-box__locations-btn");
    if (!btn) return;
    if(Object.entries(state.currentDestination).length === 0){
      return selectors.locationContainer.classList.toggle(
        "section-box__locations--inactive"
      );
    }
    if(state.activeNav === 0)    
    return selectors.locationContainer.classList.toggle(
      "section-box__locations--inactive"
    );
    return selectors.routeContainer.classList.toggle("section-box__locations-route--inactive")
  });
}

selectors.closeIcon.addEventListener("click", () => {
  addUtilityClass(selectors.locationBox, "section-locations__inactive");
});
