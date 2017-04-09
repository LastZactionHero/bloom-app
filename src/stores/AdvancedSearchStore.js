import alt from '../alt';
import SearchActions from '../actions/AdvancedSearchActions';

class AdvancedSeachStore {
  constructor() {
    this.bindListeners({
      handleUpdateOptions: SearchActions.UPDATE_OPTIONS,
      handleUpdateQuery: SearchActions.UPDATE_QUERY,
      handleUpdateResults: SearchActions.UPDATE_RESULTS,
      handleUpdatePage: SearchActions.UPDATE_PAGE,
      handleClearQuery: SearchActions.CLEAR_QUERY,
      handleSelectPlant: SearchActions.SELECT_PLANT,
      handleQueryStringChange: SearchActions.QUERY_STRING_CHANGE
    });

    this.options = {};
    this.pageIdx = 0;
    this.query = {
      common_name: '',
      height: {min: null, max: null},
      width: {min: null, max: null},
      leave_types: [],
      growth_rates: [],
      flower_colors: [],
      foliage_colors: [],
      light_needs: [],
      watering_needs: [],
      key_features: [],
      special_features: [],
      zones: [],
      usages: [],
      garden_styles: [],
      flower_attributes: [],
      plant_types: []
    };
    this.results = {
      meta: {page_idx: 0, total: 0, total_pages: 0},
      plants: []
    };
    this.queryTimeout = null;
    this.selectedPlant = null;
    this.searchCount = 0;
  }

  handleUpdateOptions(options) {
    this.options = options;
  }

  handleClearQuery(key) {
    this.query[key] = [];
    this.pageIdx = 0;

    setTimeout(() => {SearchActions.fetchResults(this.query, this.pageIdx)});
  }

  handleUpdateQuery(update) {
    if(['plant_types', 'flower_attributes', 'garden_styles', 'usages', 'zones', 'special_features', 'key_features', 'watering_needs', 'light_needs', 'leave_types', 'growth_rates', 'flower_colors', 'foliage_colors'].indexOf(update.key) != -1 ) {
      let arrIndex = this.query[update.key].indexOf(update.values.id)
      if(arrIndex == -1) {
        this.query[update.key].push(update.values.id);
      } else {
        this.query[update.key].splice(arrIndex, 1);
      }
    } else if(update.key == 'common_name') {
      this.query.common_name = update.values;
    } else if(update.key == 'height_max') {
      let dimension = parseInt(update.values);
      this.query.height.max = dimension == NaN ? null : dimension;
    } else if(update.key == 'height_min') {
      let dimension = parseInt(update.values);
      this.query.height.min = dimension == NaN ? null : dimension;
    } else if(update.key == 'width_max') {
      let dimension = parseInt(update.values);
      this.query.width.max = dimension == NaN ? null : dimension;
    } else if(update.key == 'width_min') {
      let dimension = parseInt(update.values);
      this.query.width.min = dimension == NaN ? null : dimension;
    }
    this.pageIdx = 0;

    if(this.queryTimeout){
      clearTimeout(this.queryTimeout);
    }

    this.searchCount++;
    this.queryTimeout = null;
    this.queryTimeout = setTimeout(() => {
      this.queryTimeout = null;
      SearchActions.fetchResults(this.query, this.pageIdx)
    }, 250);
  }

  handleUpdateResults(results) {
    this.results = results;
  }

  handleUpdatePage(pageIdx) {
    this.pageIdx = pageIdx;

    setTimeout(() => {SearchActions.fetchResults(this.query, this.pageIdx)});
  }

  handleSelectPlant(plant) {
    this.selectedPlant = plant;
  }

  handleQueryStringChange(queryString) {
    try {
      this.query = JSON.parse(queryString)
      this.pageIdx = 0;
      setTimeout(() => {SearchActions.fetchResults(this.query, this.pageIdx)});
    } catch(err) {
      alert('Invalid query string. Make sure you copied it correctly.')
    }

  }
}

export default alt.createStore(AdvancedSeachStore, 'AdvancedSearchStore');
