import alt from '../alt.js'
import YardsActions from '../actions/YardsActions'

class YardsStore {
  constructor() {
    this.bindListeners({
      handleStartFetchIndex: YardsActions.START_FETCH_INDEX,
      handleIndexFetched: YardsActions.INDEX_FETCHED,
      handleIndexFetchFailed: YardsActions.INDEX_FETCH_FAILED
    })
    this.yards = [];
  }

  handleStartFetchIndex() {
    // TODO: Handle this?
  }

  handleIndexFetched(yards) {
    this.yards = yards;
  }

  handleIndexFetchFailed(xhr) {
    // TODO: Handle this?
  }
}

export default alt.createStore(YardsStore, 'YardsStore');
