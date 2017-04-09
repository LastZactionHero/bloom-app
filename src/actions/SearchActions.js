import alt from '../alt';
import PlantSearchSource from 'sources/PlantSearchSource';

class AdvancedSearchActions {
  fetchOptions() {
    PlantSearchSource.fetchOptions().then( (options) => {
      this.updateOptions(options);
    });
    return null;
  }

  fetchResults(query, pageIdx) {
    PlantSearchSource.fetchResults(query, pageIdx).then( (results) => {
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

export default alt.createActions(AdvancedSearchActions);
