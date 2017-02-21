import React from 'react';
import YardsStore from '../../stores/YardsStore';
import BedBuilderStepDimensions from './BedBuilderStepDimensions';
import BedBuilderStepPosition from './BedBuilderStepPosition';
import BedBuilderStepSunlight from './BedBuilderStepSunlight';
import BedBuilderStepMoisture from './BedBuilderStepMoisture';

class BedBuilder extends React.Component {
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
      <div className='builder bed-builder'>
        <div>Bed Builder, Yard #{this.props.params.yard_id}</div>
        <div>
          <BedBuilderStepDimensions active={true} incomplete={false} />
          <BedBuilderStepPosition active={true} incomplete={false} />
          <BedBuilderStepSunlight active={true} incomplete={false} />
          <BedBuilderStepMoisture active={true} incomplete={false} />
        </div>
      </div>
    )
  }
}
export default BedBuilder;
