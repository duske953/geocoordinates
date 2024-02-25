import { renderLocations } from "../view/paginationView";
import { state } from "../model/searchModel";
import { displayLocations } from "../view/locationView";
import { selectors } from "./selectors";
/**
 *Function thant handles overall pagination when the "next" or "previous" button is clicked
 *
 */
function handlePaginationClicks() {
  displayLocations(
    renderLocations(),
    state.destinationLocations.placeReference
  );
  selectors.locationContainer.scrollTo(0,0)
  selectors.sectionBoxSelect.selectedIndex = 0;
}
/**
 *Function that controls the "next" button when the pagination is clicked
 *
 * @export
 */
export function handlePaginationNext() {
  if (
    state.paginationPages >= state.paginate &&
    state.paginate < state.paginationPages
  ) {
    // making sure when don't exceed the number of pages to paginate through
    state.paginate++;
    handlePaginationClicks();
  }
}
/**
 *Function that controls the "previous" button when the pagination is clicked
 *
 * @export
 */
export function handlePaginationPrev() {
  if (state.paginate === 1) return;
  state.paginate--;
  handlePaginationClicks();
}
