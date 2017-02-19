import React from 'react';
import { Link } from 'react-router';
import YardsStore from '../../stores/YardsStore';
import YardsActions from '../../actions/YardsActions';

class YardList extends React.Component {
  constructor() {
    super();
    this.state =  YardsStore.getState();
  }
  componentDidMount = () => {
    YardsStore.listen(this.onChange);
    YardsActions.startFetchIndex();
  }
  componentWillUnmount = () => {
    YardsStore.unlisten(this.onChange);
  }
  onChange = (state) => {
    this.setState(state);
  }

  render() {
    return(
      <div>
        <div>Yard List</div>
        <Link to={{pathname: '/dashboard/yards/builder/'}}>Create a new Yard</Link>
        <ul>
          {this.state.yards.map( (yard) => {
            return <li>{yard.id} | {yard.zipcode} | {yard.zone} | {yard.soil} | {yard.preferred_plant_types} | {yard.created_at} </li>
          })}
        </ul>
      </div>
    )
  }
}

export default YardList
