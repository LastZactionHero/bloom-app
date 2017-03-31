  import React from 'react';
import { Link } from 'react-router'
import YardsStore from '../../stores/YardsStore';
import YardListItem from './YardListItem';
import FacebookTrackingPixel from 'components/Common/FacebookTrackingPixel';

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
          <div className='row'>
            <div className='col-md-8 col-md-offset-2'>
              <div className='panel panel-default panel-brand panel-yard-list-intro'>
                <div className='panel-heading'>
                  <h2 className='text-center'>Welcome to Bloom!</h2>
                </div>
                <div className='panel-body'>
                  <p>
                    Bloom is your personal landscape assistant.
                    We&apos;re going to ask you about your yard, and aid you step-by-step to pick great designs and plants.
                  </p>
                  <p>
                    While we walk you through the process, remember: <strong>you&apos;re   in charge</strong>.
                    Consider Bloom as a resource of professional and creative suggestions to guide your own creativity.
                  </p>
                  <hr/>
                  <div className='text-center'>
                    <Link className='btn btn-success btn-first-yard' to={{pathname: '/dashboard/yards/new'}}>Start Designing!</Link>
                  </div>
                  <FacebookTrackingPixel eventName='AddToCart' />
                </div>
              </div>
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
