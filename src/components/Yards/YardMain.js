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
                <Link className='btn btn-primary'
                      to={{pathname: `/dashboard/yards/${yard.id}/beds/new`}}>Add New Bed</Link>
                <hr/>

                {yard.beds.map( (bed) => {
                  return <div key={`bed_template_link_${bed.id}`}>
                    <div><strong>ID {bed.id}: {bed.name}</strong></div>
                    <div>{bed.width}&apos; W x {bed.depth}&apos; H</div>
                    <div>Attached to House: {bed.attached_to_house}</div>
                    <div>Orientation: {bed.orientation}</div>
                    <div>Sunlight, Morning: {bed.sunlight_morning}</div>
                    <div>Sunlight, Afternoon: {bed.sunlight_afternoon}</div>
                    <div>Watered: {bed.watered}</div>
                    <div>Template ID: {bed.template_id}</div>

                    <Link className='btn btn-primary'
                          to={{pathname: `/dashboard/yards/${yard.id}/beds/${bed.id}/template`}}>Select Template</Link>
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
