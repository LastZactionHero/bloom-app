import alt from '../alt.js'
import YardSource from '../sources/YardSource';

class YardsActions {
  startFetchIndex() {
    YardSource.index()
      .then( (yards) => { this.indexFetched(yards) })
      .catch( (xhr) => { this.indexFetchFailed(xhr) })
    return null;
  }

  indexFetched(yards) {
    return yards;
  }

  indexFetchFailed(xhr) {
    return xhr;
  }
}

export default alt.createActions(YardsActions);
