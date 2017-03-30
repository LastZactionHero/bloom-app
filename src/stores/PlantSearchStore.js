import alt from '../alt';
import PlantSearchActions from 'actions/PlantSearchActions';
import ArrayUtil from '../util/array';

class PlantSeachStore {
  constructor() {
    this.bindListeners({
      initQuery: PlantSearchActions.INIT_QUERY,

      fetchOptionsStart: PlantSearchActions.START_FETCH_OPTIONS,
      fetchOptionsDone: PlantSearchActions.FETCHED_OPTIONS,
      fetchOptionsFail: PlantSearchActions.FETCH_OPTIONS_FAIL,

      fetchResultsStart: PlantSearchActions.START_FETCH_RESULTS,
      fetchResultsDone: PlantSearchActions.FETCHED_RESULTS,
      fetchResultsFail: PlantSearchActions.FETCH_RESULTS_FAIL,

      updatePage: PlantSearchActions.UPDATE_PAGE,

      setupQueryAndFetch: PlantSearchActions.SETUP_QUERY_AND_FETCH,

      changeCommonName: PlantSearchActions.CHANGE_COMMON_NAME
    });

    this.options = {};
    this.pageIdx = 0;
    this.query = {};
    this.results = {
      meta: {page_idx: 0, total: 0, total_pages: 0},
      plants: []
    };

    this.loading = {
      options: false,
      results: false
    }
    this.error = null;
  }

  initQuery(query) {
    this.query = query;
  }

  // Fetch Options
  fetchOptionsStart() {
    this.loading.options = true;
    this.error = null;
  }

  fetchOptionsDone(options) {
    this.loading.options = false;
    this.options = options;
  }

  fetchOptionsFail(response) {
    this.loading.options = false;
    this.options = [];
    this.error = response.errors || {};
  }

  // Fetch Results
  fetchResultsStart() {
    this.loading.results = true;
    this.error = null;
  }

  fetchResultsDone(results) {
    this.loading.results = false;
    this.results = results;
  }

  fetchResultsFail(response) {
    this.loading.results = false;
    this.results = {
      meta: {page_idx: 0, total: 0, total_pages: 0},
      plants: []
    };
    this.error = response.errors || {};
  }

  // Update Page
  updatePage(pageIdx) {
    this.pageIdx = pageIdx;
    setTimeout(() => {PlantSearchActions.startFetchResults(this.query, this.pageIdx)});
  }

  // Set Query
  // query: {}, bed: {} (optional), yard: {} (optional)
  setupQueryAndFetch(queryData) {
    this.query = Object.assign({
      common_name: '',
      height: {min: null, max: null},
      width: {min: null, max: null},
      leave_types: [],
      growth_rates: [],
      flower_colors: [],
      foliage_colors: [],
      light_needs: [],
      watering_needs: [], // Deprecated?
      key_features: [],
      special_features: [],
      zones: [],
      usages: [],
      garden_styles: [],
      flower_attributes: [],
      plant_types: [],
      preference_permalinks: [],
      soil_moisture: '',
      lighting: ''
    }, queryData.query);

    // Lighting
    if(!queryData.bed.sunlight_morning && !queryData.bed.sunlight_afternoon) {
      this.query.lighting = 'full_shade';
    } else if(!queryData.bed.sunlight_morning && queryData.bed.sunlight_afternoon) {
      this.query.lighting = 'afternoon';
    } else if(queryData.bed.sunlight_morning && !queryData.bed.sunlight_afternoon) {
      this.query.lighting = 'morning';
    } else {
      this.query.lighting = 'full_sun';
    }

    // Soil Moisture
    this.query.soil_moisture = queryData.bed.soil;

    // Watered, so we can include plants that require more water
    if(queryData.bed.watered) {
      switch(this.query.soil_moisture){
        case 'dry':
          this.query.soil_moisture += '|normal|wet';
          break;
        case 'normal':
          this.query.soil_moisture += '|wet';
          break;
      }
    }

    // Zones
    const yard = queryData.yard;
    if(yard) {
      this.query.zones.push(yard.zone)
    }

    // Indicate any past plant picks, if present
    const pastPlantPermalinks = ArrayUtil.flatten(yard.beds.map( (bed) => { return Object.values(bed.template_plant_mapping).map((p) => {return p.permalink})}))
    if(pastPlantPermalinks.length > 0) {
      this.query.preference_permalinks = pastPlantPermalinks
    }

    // Set a maximum width based on the dimensions of the bed to prevent picking a plant too large for the bed to
    // contain it
    const maxWidth = Math.min(queryData.bed.width, queryData.bed.depth) * 12;
    this.query.width.max = Math.min(maxWidth, this.query.width.max);

    const tooSmallReductionProportion = 0.8; // If the new max is smaller than the new min, reduce the min
    if(this.query.width.min >= this.query.width.max * tooSmallReductionProportion) {
      this.query.width.min = this.query.width.max * tooSmallReductionProportion;
    }

    this.pageIdx = 0; // reset page

    setTimeout(() => {PlantSearchActions.startFetchResults(this.query, this.pageIdx)});
  }

  changeCommonName(commonName) {
    this.query.common_name = commonName;

    // Prevent multiple submits
    if(this.queryTimeout){ clearTimeout(this.queryTimeout); }
    this.queryTimeout = null;
    this.queryTimeout = setTimeout(() => {
      this.queryTimeout = null;
      this.pageIdx = 0; // reset page
      PlantSearchActions.startFetchResults(this.query, this.pageIdx);
    }, 250);
  }

  // handleUpdateOptions(options) {
  //   this.options = options;
  // }
  //
  // handleClearQuery(key) {
  //   this.query[key] = [];
  //   this.pageIdx = 0;
  //
  //   setTimeout(() => {SearchActions.fetchResults(this.query, this.pageIdx)});
  // }
  //
  // handleUpdateQuery(update) {
  //   if(['plant_types', 'flower_attributes', 'garden_styles', 'usages', 'zones', 'special_features', 'key_features', 'watering_needs', 'light_needs', 'leave_types', 'growth_rates', 'flower_colors', 'foliage_colors'].indexOf(update.key) != -1 ) {
  //     let arrIndex = this.query[update.key].indexOf(update.values.id)
  //     if(arrIndex == -1) {
  //       this.query[update.key].push(update.values.id);
  //     } else {
  //       this.query[update.key].splice(arrIndex, 1);
  //     }
  //   } else if(update.key == 'common_name') {
  //     this.query.common_name = update.values;
  //   } else if(update.key == 'height_max') {
  //     let dimension = parseInt(update.values);
  //     this.query.height.max = dimension == NaN ? null : dimension;
  //   } else if(update.key == 'height_min') {
  //     let dimension = parseInt(update.values);
  //     this.query.height.min = dimension == NaN ? null : dimension;
  //   } else if(update.key == 'width_max') {
  //     let dimension = parseInt(update.values);
  //     this.query.width.max = dimension == NaN ? null : dimension;
  //   } else if(update.key == 'width_min') {
  //     let dimension = parseInt(update.values);
  //     this.query.width.min = dimension == NaN ? null : dimension;
  //   }
  //   this.pageIdx = 0;
  //
  //   if(this.queryTimeout){
  //     clearTimeout(this.queryTimeout);
  //   }
  //
  //   this.queryTimeout = null;
  //   this.queryTimeout = setTimeout(() => {
  //     this.queryTimeout = null;
  //     SearchActions.fetchResults(this.query, this.pageIdx)
  //   }, 250);
  // }
  //
  // handleUpdateResults(results) {
  //   this.results = results;
  // }
  //
  // handleUpdatePage(pageIdx) {
  //   this.pageIdx = pageIdx;
  //
  //   setTimeout(() => {SearchActions.fetchResults(this.query, this.pageIdx)});
  // }
  //
  // handleSelectPlant(plant) {
  //   this.selectedPlant = plant;
  // }
}

export default alt.createStore(PlantSeachStore, 'PlantSearchStore');
