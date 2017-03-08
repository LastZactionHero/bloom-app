import React from 'react';
import { Link } from 'react-router'
import YardsStore from '../../stores/YardsStore';

import YardListItem from './YardListItem';

class YardList extends React.Component {
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
    return(
      <div className='yards-list'>
        {this.state.yards.length == 0 ?
          <div>
            <h2 className='text-center'>Welcome to Bloom!</h2>
            <hr/>
            <h3>We&apos;re going to walk you through designing a garden bed.</h3>

            <Link className='btn btn-success btn-first-yard' to={{pathname: '/dashboard/yards/new'}}>Start Designing your Yard</Link>
          </div>
          :
          <div>
            <div>
              <h2>My Yards</h2>
              <Link className='btn btn-primary' to={{pathname: '/dashboard/yards/new'}}>Start a New Yard</Link>
            </div>

            <hr />

            <div className='row'>
              {this.state.yards.map( (yard) => {
                return <YardListItem key={`yard_${yard.id}`} yard={yard} />
              })}
            </div>
          </div>
        }
      </div>
    )
  }
}

export default YardList
