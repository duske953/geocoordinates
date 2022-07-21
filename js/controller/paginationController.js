import { renderLocations } from "../view/paginationView";
import { state } from "../model/searchModel";
import { displayLocations } from "../view/locationView";
import { selectors } from "./selectors";

function handlePaginationClicks() {
  displayLocations(
    renderLocations(),
    state.destinationLocations.placeReference
  );
  selectors.locationItemsBox.scrollIntoView();
  selectors.sectionBoxSelect.selectedIndex = 0;
  setTimeout(() => {
    selectors.nav.scrollIntoView();
  }, 500);
}

export function handlePaginationNext() {
  if (
    state.paginationPages >= state.paginate &&
    state.paginate < state.paginationPages
  ) {
    state.paginate++;
    handlePaginationClicks();
  }
}

export function handlePaginationPrev() {
  if (state.paginate === 1) return;
  state.paginate--;
  handlePaginationClicks();
}
