import React from 'react';
import YardList from './YardList';
import YardsStore from '../../stores/YardsStore';
import YardsActions from '../../actions/YardsActions';
import Loading from '../Common/Loading';

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
        {this.state.loading.yards ?  <Loading message='Loading yards' /> : children}
      </div>
    )
  }
}

export default YardsMain;
