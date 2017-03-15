import React from 'react'
import YardsStore from '../../stores/YardsStore';
import { Link } from 'react-router';
import BedListItem from './BedListItem';

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
    if(children) {
      children = React.cloneElement(this.props.children, { yard: yard });
    }

    return(
      <div className='yard'>
        {
          yard ?
            children ?
              children :
              <div>
                {yard.beds.length == 0 ? null :
                  <div className="btn-group" role="group">
                    <Link className='btn btn-default'
                          to={{pathname: `/dashboard/yards/${yard.id}/beds/new`}}>
                      Add New Bed&nbsp;
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </Link>
                    <Link className='btn btn-default'
                        to={{pathname: `/dashboard/yards/${yard.id}/shopping_list`}}>
                      Nursery Shopping List&nbsp;
                      <i className="fa fa-shopping-cart" />
                    </Link>
                  </div>

                }

                {yard.beds.length == 0 ?
                  <div>
                    <div className='alert alert-warning alert-inverted'>You have not set up any garden beds!</div>
                    <div className='text-center'>
                      <Link className='btn btn-success btn-lg'
                            to={{pathname: `/dashboard/yards/${yard.id}/beds/new`}}>Add your First Bed&nbsp;<i className="fa fa-plus" aria-hidden="true"></i></Link>
                    </div>
                  </div>
                  : null
                }
                <div className='bed-list'>
                  {yard.beds.map( (bed) => {
                    return <BedListItem bed={bed} key={`bed_list_item_${bed.id}`} />
                  })}
                </div>

                {yard.beds.length == 0 ? null :
                  <div className='text-center'>
                    <Link className='btn btn-success btn-lg'
                          to={{pathname: `/dashboard/yards/${yard.id}/beds/new`}}>Add Another Bed&nbsp;<i className="fa fa-plus" aria-hidden="true"></i></Link>
                  </div>
                }
              </div> :
            <div>Not found</div>
        }
      </div>
    )
  }
}

export default YardMain;
