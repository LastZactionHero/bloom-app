import alt from '../alt.js'
import YardsActions from '../actions/YardsActions'
import BedActions from '../actions/BedActions';
import BedBuilderActions from 'actions/BedBuilderActions';
import YardBuilderActions from 'actions/YardBuilderActions';
import { browserHistory } from 'react-router'

class YardsStore {
  constructor() {
    this.bindListeners({
      // Yards
      indexFetchStart: YardsActions.START_FETCH_INDEX,
      indexFetchDone: YardsActions.INDEX_FETCHED,
      indexFetchFail: YardsActions.INDEX_FETCH_FAILED,

      // Create Yard
      createYardStart: YardBuilderActions.START_CREATE_YARD,
      createYardDone: YardBuilderActions.CREATED_YARD,
      createYardFail: YardBuilderActions.CREATE_YARD_FAIL,

      // Create Bed
      createBedDone: BedBuilderActions.CREATED_BED,

      // Bed Template Suggestions
      suggestedTemplatesStartLoading: BedActions.START_FETCH_SUGGEST_TEMPLATES,
      suggestedTemplatesFetched: BedActions.DONE_FETCH_SUGGEST_TEMPLATES,
      suggestedTemplatesFail: BedActions.FAIL_FETCH_SUGGEST_TEMPLATES,

      // Bed Select Template
      selectTemplateStart: BedActions.START_SELECT_TEMPLATE,
      selectTemplateFail: BedActions.FAIL_SELECT_TEMPLATE,
      selectTemplateDone: BedActions.DONE_SELECT_TEMPLATE
    });

    this.exportPublicMethods({
      findYardById: this.findYardById
    });

    this.yards = [];
    this.suggestedTemplates = [];
    this.loading = {
      yards: false,
      createYard: false,
      suggestedTemplates: false,
      selectTemplate: false
    }
  }

  findYardById(id) {
    return this.getState().yards.find((y) => {return y.id == parseInt(id)})
  }

  // Yards Index
  indexFetchStart() {
    this.loading.yards = true;
  }

  indexFetchDone(yards) {
    this.yards = yards;
    this.loading.yards = false;
  }

  indexFetchFail(xhr) {
    this.fetchingData = false;
  }

  // Create Yard
  createYardStart() {
    this.loading.createYard = true;
    this.error = null;
  }

  createYardDone(yard) {
    this.loading.createYard = false;
    this.yards.push(yard);

    setTimeout(() => {
      browserHistory.push(`/dashboard/yards/${yard.id}/beds/new`);
    });
  }

  createYardFail(response) {
    this.loading.createYard = false;
    this.error = response.errors || {};
  }

  // Bed Created
  createBedDone(bed) {
    const yard = this.yards.find((yard) => {return yard.id == bed.yard_id});
    yard.beds.push(bed);

    setTimeout(() => {
      browserHistory.push(`/dashboard/yards/${bed.yard_id}/beds/${bed.id}/template`);
    });
  }

  // Suggested Templates
  suggestedTemplatesStartLoading() {
    this.loading.suggestedTemplates = true;
    this.error = null;
  }

  suggestedTemplatesFetched(suggestedTemplates) {
    this.loading.suggestedTemplates = false;
    this.suggestedTemplates = suggestedTemplates;
  }

  suggestedTemplatesFail(response) {
    this.loading.suggestedTemplates = false;
    this.error = response.errors || {};
  }

  // Select Template
  selectTemplateStart() {
    this.loading.selectTemplate = true;
    this.error = null;
  }

  selectTemplateFail(response) {
    this.loading.selectTemplate = false;
    this.error = response.errors || {};
  }

  selectTemplateDone(bed) {
    this.loading.selectTemplate = false;

    const yard = this.yards.find((yard) => {return yard.id == bed.yard_id});
    yard.beds.forEach( (b, bedIdx) => { if(b.id == bed.id) { yard.beds[bedIdx] = bed; }});

    setTimeout(() => {
      browserHistory.push(`/dashboard/yards/${bed.yard_id}/beds/${bed.id}/plants`);
    });
  }

}

export default alt.createStore(YardsStore, 'YardsStore');
