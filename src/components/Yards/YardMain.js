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
    if(children) {
      children = React.cloneElement(this.props.children, { yard: yard });
    }

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
                {yard.beds.map( (bed) => {
                  return <div key={`bed_template_link_${bed.id}`}>
                    <Link className='btn btn-default'
                          to={{pathname: `/dashboard/yards/${yard.id}/beds/${bed.id}/template`}}>Template {bed.id} ({bed.name})</Link>
                  </div>
                })}
              </div> :
            <div>Not found</div>
        }
      </div>
    )
  }
}

export default YardMain;
