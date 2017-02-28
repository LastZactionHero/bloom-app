import React from 'react';
import { browserHistory, Link } from 'react-router'
import YardsStore from '../../stores/YardsStore';
import StringUtil from '../../util/string';

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
                return <div className='col-sm-12 col-md-5 yard-list-tile'
                            key={`yard_${yard.id}`}
                            onClick={() => { browserHistory.push( `/dashboard/yards/${yard.id}` )}}>
                  <h3 className='text-center'>Zone {yard.zone} ({yard.zipcode})</h3>
                  <div>{StringUtil.pluralize(yard.beds.length, 'Bed', 'Beds')}</div>
                  <div>Created {yard.created_at}</div>

                </div>
              })}
            </div>
          </div>
        }
      </div>
    )
  }
}

export default YardList
