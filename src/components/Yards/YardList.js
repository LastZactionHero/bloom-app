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
            <div className='text-center'>
              <h3>We&apos;re going to walk you through designing a garden bed.</h3>
              <Link className='btn btn-success btn-first-yard' to={{pathname: '/dashboard/yards/new'}}>Start Designing your Yard</Link>
            </div>
          </div>
          :
          <div>
            <div>
              <h2>My Yards</h2>
              <div className="btn-group" role="group">
                <Link className='btn btn-default'
                      to={{pathname: `/dashboard/yards/new`}}>
                  Start a New Yard&nbsp;
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </Link>
              </div>
            </div>

            <hr />
            {this.state.yards.length < 2 ?
              <div className='step-hint'>
                Use yards to organize your designs.
                If you want to experiment with some new designs or plants, you can do it in a new yard.
              </div>
              : null }

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
