import alt from '../alt';
import BedActions from '../actions/BedActions';

class BedStore {
  constructor() {
    this.bindListeners({
      handleInit: BedActions.INIT,
      handleStartLoading: [BedActions.START_FETCH_SUGGEST_TEMPLATES],
      handleStopLoading: [BedActions.DONE_FETCH_SUGGEST_TEMPLATES, BedActions.FAIL_FETCH_SUGGEST_TEMPLATES],
      handleFetchedSuggestTemplates: BedActions.DONE_FETCH_SUGGEST_TEMPLATES,
      handleFailSuggestTemplates: BedActions.FAIL_FETCH_SUGGEST_TEMPLATES,

      handleStartSelectTemplate: BedActions.START_SELECT_TEMPLATE,
      handleFailSelectTemplate: BedActions.FAIL_SELECT_TEMPLATE,
      handleSetTemplate: BedActions.DONE_SELECT_TEMPLATE
    });

    this.bed = null;
    this.suggestedTemplates = [];

    this.loading = true;
    this.selecting = false;
    this.error = null;
  }

  handleInit(bed) {
    this.bed = bed;
  }

  handleStartLoading() {
    this.loading = true;
    this.error = null;
  }
  handleStopLoading() {
    this.loading = false;
  }

  handleFetchedSuggestTemplates(suggestedTemplates) {
    this.suggestedTemplates = suggestedTemplates;
  }

  handleFailSuggestTemplates(response) {
    this.error = response.errors || {};
  }

  handleStartSelectTemplate() {
    this.selecting = true;
    this.error = null;
  }

  handleFailSelectTemplate(response) {
    this.selecting = false;
    this.error = response.errors || {};
  }

  handleSetTemplate(bed) {
    this.bed = bed;
    this.selecting = false;
  }

}

export default alt.createStore(BedStore, 'BedStore');