import alt from '../alt';
import AdvancedSearchSource from 'sources/PlantSearchSource';

class SearchActions {
  fetchOptions() {
    AdvancedSearchSource.fetchOptions().then( (options) => {
      this.updateOptions(options);
    });
    return null;
  }

  fetchResults(query, pageIdx) {
    AdvancedSearchSource.fetchResults(query, pageIdx).then( (results) => {
      this.updateResults(results);
    });
    return null;
  }

  clearQuery(key) {
    return key;
  }

  updateOptions(options) {
    return options;
  }

  updatePage(pageIdx) {
    return pageIdx;
  }

  updateQuery(key, values) {
    return {key: key, values: values}
  }

  updateResults(results) {
    return results;
  }

  selectPlant(plant) {
    return plant;
  }

  queryStringChange(queryString) {
    return queryString;
  }
}

export default alt.createActions(SearchActions);
