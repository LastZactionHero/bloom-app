import React from 'react';
import YardList from './YardList';
import YardsStore from '../../stores/YardsStore';
import YardsActions from '../../actions/YardsActions';

class YardsMain extends React.Component {
  constructor() {
    super();
    this.state =  YardsStore.getState();
  }
  componentDidMount = () => {
    YardsStore.listen(this.onChange);
    setTimeout( () => { YardsActions.startFetchIndex(); });
  }
  componentWillUnmount = () => {
    YardsStore.unlisten(this.onChange);
  }
  onChange = (state) => {
    this.setState(state);
  }

  render(){
    let children = this.props.children || <YardList/>;
    return(
      <div>
        {this.state.pendingFirstFetch ?  <div>Loading...</div> : children}
      </div>
    )
  }
}

export default YardsMain;
