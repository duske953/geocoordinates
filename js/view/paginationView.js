import { state } from "../model/searchModel";
import { selectors } from "../controller/selectors";
import {
  addUtilityClass,
  removeUtiliyClass,
  showMarkerOnPlace,
} from "./utilityView";

export function renderLocations() {
  state.paginationPages =
    state.destinationLocations.candidates.length / state.resultPerPage;
  selectors.paginationText.textContent = `${state.paginate} OF ${state.paginationPages}`;
  return state.destinationLocations.candidates.slice(
    (state.paginate - 1) * 10,
    state.paginate * 10
  );
}

export function paginationView() {
  addUtilityClass(selectors.paginationBox, "section-box__pagination--active");
}

export function renderPaginationNext(handler) {
  selectors.paginationBtnNext.addEventListener("click", () => {
    handler();
  });
}

export function renderPaginationPrev(handler) {
  selectors.paginationBtnPrev.addEventListener("click", () => {
    handler();
  });
}
