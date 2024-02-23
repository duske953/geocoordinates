import { state } from "../model/searchModel";
import { selectors } from "../controller/selectors";
import { addUtilityClass } from "./utilityView";

/**
 *
 *Function to slice a portion of the places(destinationLocations) array and render it to the ui
 * @export
 * @return {Array} An truncated array of the places
 */
export function renderLocations() {
  state.paginationPages =
    Math.ceil(state.destinationLocations.candidates.length / state.resultPerPage)
  selectors.paginationText.textContent = `${state.paginate} OF ${state.paginationPages}`;
  return state.destinationLocations.candidates.slice(
    (state.paginate - 1) * 10,
    state.paginate * 10
  );
}

/**
 *Functio to display the pagination ui to the screen
 *
 * @export
 */
export function paginationView() {
  addUtilityClass(selectors.paginationBox, "section-box__pagination--active");
}

/**
 *Function that executes when the next button of the pagination is executed
 *
 * @export
 * @param {Function} handler This function is executed when the "renderPaginationNext" is called (publisher-subscriber-pattern)
 */
export function renderPaginationNext(handler) {
  selectors.paginationBtnNext.addEventListener("click", () => {
    handler();
  });
}

/**
 *Function that executes when the previous button of the pagination is executed
 *
 * @export
 * @param {Function} handler This function is executed when the "renderPaginationPrev" is called (publisher-subscriber-pattern)
 */

export function renderPaginationPrev(handler) {
  selectors.paginationBtnPrev.addEventListener("click", () => {
    handler();
  });
}
