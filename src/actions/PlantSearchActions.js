import alt from '../alt';
import PlantSearchSource from 'sources/PlantSearchSource';

class PlantSearchActions {
  initQuery(query) {
    return query
  }

  startFetchOptions() {
    PlantSearchSource.fetchOptions().then( (options) => {
      this.fetchedOptions(options);
    }).catch( (xhr) => {
      this.fetchOptionsFail(xhr)
    });
    return null;
  }

  fetchedOptions(options) {
    return options;
  }

  fetchOptionsFail(xhr) {
    return (xhr.responseJSON || {});
  }

  startFetchResults(query, pageIdx) {
    this.initQuery(query);
    PlantSearchSource.fetchResults(query, pageIdx).then( (results) => {
      this.fetchedResults(results);
    }).catch( (xhr) => {
      this.fetchResultsFail(xhr)
    });
    return null;
  }

  fetchedResults(results) {
    return results;
  }

  fetchResultsFail(xhr) {
    return (xhr.responseJSON || {});
  }

  setupQueryAndFetch(query, bed, yard) {
    return {query: query, bed: bed, yard: yard};
  }

  // clearQuery(key) {
  //   return key;
  // }
  //
  // updateOptions(options) {
  //   return options;
  // }

  updatePage(pageIdx) {
    return pageIdx;
  }

  changeCommonName(commonName) {
    return commonName;
  }
  //
  // updateQuery(key, values) {
  //   return {key: key, values: values}
  // }
  //
  // updateResults(results) {
  //   return results;
  // }
  //
  // selectPlant(plant) {
  //   return plant;
  // }
}

export default alt.createActions(PlantSearchActions);
