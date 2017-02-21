import React from 'react'
import YardsStore from '../../stores/YardsStore';
import { Link } from 'react-router';

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
    let yard = YardsStore.findYardById(this.props.params.yard_id);
    let children = this.props.children;

    return(
      <div>
        <div>Yard Main, #{this.props.params.yard_id}</div>
        {
          yard ?
            children ?
              children :
              <div>
                <div>{yard.id}</div>
                <div>Beds: {yard.beds.length}</div>
                <Link className='btn btn-default'
                      to={{pathname: `/dashboard/yards/${yard.id}/beds/new`}}>New Bed</Link>
              </div> :
            <div>Not found</div>
        }
      </div>
    )
  }
}

export default YardMain;
