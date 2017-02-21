import alt from '../alt.js'
import YardsActions from '../actions/YardsActions'

class YardsStore {
  constructor() {
    this.bindListeners({
      handleStartFetchIndex: YardsActions.START_FETCH_INDEX,
      handleIndexFetched: YardsActions.INDEX_FETCHED,
      handleIndexFetchFailed: YardsActions.INDEX_FETCH_FAILED
    })
    this.exportPublicMethods({
      findYardById: this.findYardById
    });

    this.pendingFirstFetch = true;
    this.yards = [];
  }

  findYardById(id) {
    return this.getState().yards.find((y) => {return y.id == parseInt(id)})
  }

  handleStartFetchIndex() {
  }

  handleIndexFetched(yards) {
    this.yards = yards;
    this.pendingFirstFetch = false;
  }

  handleIndexFetchFailed(xhr) {
    this.fetchingData = false;
  }
}

export default alt.createStore(YardsStore, 'YardsStore');
