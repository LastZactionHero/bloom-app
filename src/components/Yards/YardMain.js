import React from 'react'
import YardsStore from '../../stores/YardsStore';

class YardMain extends React.Component {
  constructor() {
    super();
    this.state =  YardsStore.getState();
  }
  componentDidMount = () => {
    YardsStore.listen(this.onChange);
  }
  componentWillUnmount = () => {
    YardsStore.unlisten(this.onChange);
  }
  onChange = (state) => {
    this.setState(state);
  }

  render() {
    let yard = YardsStore.findYardById(this.props.params.id);
    let children = this.props.children;

    return(
      <div>
        <div>Yard Main</div>
        {
          yard ? children ? children : <div>{yard.id}</div> : <div>Not found</div>
        }
      </div>
    )
  }
}

export default YardMain;