import alt from '../alt.js'
import YardsActions from '../actions/YardsActions'
import BedActions from '../actions/BedActions';
import BedBuilderActions from 'actions/BedBuilderActions';
import YardBuilderActions from 'actions/YardBuilderActions';
import TemplateActions from 'actions/TemplateActions';
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
      selectTemplateDone: BedActions.DONE_SELECT_TEMPLATE,

      // Fetch Placements
      fetchPlacementsStart: TemplateActions.FETCH_PLACEMENTS,
      fetchPlacementsDone: TemplateActions.FETCH_PLACEMENTS_DONE,
      fetchPlacementsFail: TemplateActions.FETCH_PLACEMENTS_FAIL,

      // Map Plant to Template Plant
      mapTemplatePlant: BedActions.MAP_TEMPLATE_PLANT,

      // Delete Bed
      deleteBedStart: BedActions.START_DELETE,
      deleteBedDone: BedActions.DONE_DELETE,
      deleteBedFail: BedActions.FAIL_DELETE,

      // Delete Yard
      deleteYardStart: YardsActions.START_DELETE,
      deleteYardDone: YardsActions.DONE_DELETE,
      deleteYardFail: YardsActions.FAIL_DELETE
    });

    this.exportPublicMethods({
      findYardById: this.findYardById,
      shoppingList: this.shoppingList,
      plantSelectionList: this.plantSelectionList
    });

    this.yards = [];
    this.suggestedTemplates = [];

    this.loading = {
      yards: false,
      createYard: false,
      suggestedTemplates: false,
      selectTemplate: false,
      placements: false,
      bed: false
    }
  }

  findYardById(id) {
    return this.getState().yards.find((y) => {return y.id == parseInt(id)})
  }

  plantSelectionList(bed) {
    if(!Array.isArray(bed.template_placements)){return []} // TODO: Shouldn't happen, bad init?

    const labels = Array.from(new Set(bed.template_placements.map((tp) => {return tp.plant.label})));
    return labels.map((label) => {
      return {label: label, plant: bed.template_plant_mapping[label]}
    })
  }

  shoppingList(yard) {
    let shoppingList = [];

    // For each bed in the yard...
    yard.beds.forEach( (bed) => {
      if(Array.isArray(bed.template_placements)) { // TODO: Why is this necessary? Bad init?
        // For each placement in the bed...
        bed.template_placements.map((placement) => {return placement.plant.label}).forEach( (label) => {
          const plant = bed.template_plant_mapping[label] // Find the plant for the placement
          if(plant){
            // Does it exist in the shopping list already?
            let shoppingListItem = shoppingList.find((p) => {return p.plant.permalink == plant.permalink})

            if(shoppingListItem == undefined) {
              // No - Create a new list item
              shoppingListItem = {plant: plant, count: 1, beds: [bed]}
              shoppingList.push(shoppingListItem)
            } else {
              // Yes - Append to the existing list item
              shoppingListItem.count += 1
              if(shoppingListItem.beds.indexOf(bed) == -1){
                shoppingListItem.beds.push(bed)
              }
            }
          }
        });
      }
    });

    return shoppingList;
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

  // Fetch Placements
  fetchPlacementsStart() {
    this.loading.placements = true;
    this.error = null;
  }

  fetchPlacementsDone(bedPlacements) {
    const bed = bedPlacements.bed;
    const placements = bedPlacements.placements;

    bed.meta = bed.meta || {
      templatePlants: []
    };
    bed.template_placements = placements;

    // Pull all unique plant placeholders from the placements
    bed.meta.templatePlants = [];
    const plantLabels = new Set(placements.map( (p) => { return p.plant.label } ));
    plantLabels.forEach( (label) => {
      const placement = placements.find( (p) => { return p.plant.label == label });
      bed.meta.templatePlants.push(placement.plant);
    });

    this.loading.placements = false;

    setTimeout( () => { BedActions.startUpdate(bed) } )
  }

  fetchPlacementsFail(bedErrorResponse) {
    const bed = bedErrorResponse.bed;
    const response = bedErrorResponse.response;

    bed.meta = {
      templatePlants: [],
      placements: []
    };
    this.error = response.errors || {};
    this.loading.placements = false;
  }

  mapTemplatePlant(mapping) {
    const bed = mapping.bed;
    bed.template_plant_mapping = bed.template_plant_mapping || {}; // init if not defined

    bed.template_plant_mapping[mapping.templatePlant.label] = mapping.plant;

    setTimeout( () => { BedActions.startUpdate(bed) } )
  }

  // Delete Bed
  deleteBedStart() {
    this.loading.bed = true;
  }

  deleteBedDone(yardID) {
    this.loading.bed = false;
    setTimeout( () => {
      this.yards = [];
      YardsActions.startFetchIndex();
      browserHistory.push(`/dashboard/yards/${yardID}`);
    })
  }

  deleteBedFail(response) {
    this.loading.bed = false;
    this.error = response.errors || {}
  }

  // Delete Yard
  deleteYardStart() {
    this.loading.yards = true;
  }

  deleteYardDone() {
    this.loading.yards = false;
    setTimeout( () => {
      this.yards = [];
      YardsActions.startFetchIndex();
      browserHistory.push('/dashboard/yards');
    })
  }

  deleteYardFail(response) {
    this.loading.yards = false;
    this.error = response.errors || {}
  }
}

export default alt.createStore(YardsStore, 'YardsStore');
