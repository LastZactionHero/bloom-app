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

  startDelete(yard) {
    YardSource.destroy(yard)
      .then(this.doneDelete)
      .catch(this.failDelete)
    return null;
  }

  doneDelete() {
    return null;
  }

  failDelete(xhr) {
    return xhr.responseJSON || {};
  }
}

export default alt.createActions(YardsActions);
