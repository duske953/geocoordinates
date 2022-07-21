import { selectors } from "../controller/selectors";
import { removeUtiliyClass } from "./utilityView";
export function OpenNavBar(handler) {
  selectors.btnLocations.addEventListener("click", (e) => {
    const btn = e.target.closest(".section-box__locations-btn");
    if (!btn) return;
    selectors.locationContainer.classList.toggle(
      "section-box__locations--active"
    );

    handler();
  });
}

selectors.closeIcon.addEventListener("click", () => {
  removeUtiliyClass(selectors.locationBox, "section-locations__active");
});
