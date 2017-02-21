import React from 'react';
import BedBuilderStore from '../../stores/BedBuilderStore';
import BedBuilderStepDimensions from './BedBuilderStepDimensions';
import BedBuilderStepPosition from './BedBuilderStepPosition';
import BedBuilderStepSunlight from './BedBuilderStepSunlight';
import BedBuilderStepMoisture from './BedBuilderStepMoisture';

class BedBuilder extends React.Component {
  constructor() {
    super();
    this.state =  BedBuilderStore.getState();
  }
  componentDidMount = () => {
    BedBuilderStore.listen(this.onChange);
  }
  componentWillUnmount = () => {
    BedBuilderStore.unlisten(this.onChange);
  }
  onChange = (state) => {
    this.setState(state);
  }

  render() {
    return(
      <div className='builder bed-builder'>
        <div>Bed Builder, Yard #{this.props.params.yard_id}</div>
        <div>
          <BedBuilderStepDimensions active={this.state.activeStep == 'dimensions'} incomplete={!this.state.steps.dimensions.complete} />
          <BedBuilderStepPosition   active={this.state.activeStep == 'position'} incomplete={!this.state.steps.position.complete} />
          <BedBuilderStepSunlight   active={this.state.activeStep == 'sunlight'} incomplete={!this.state.steps.sunlight.complete} />
          <BedBuilderStepMoisture   active={this.state.activeStep == 'moisture'} incomplete={!this.state.steps.moisture.complete}  />
        </div>
      </div>
    )
  }
}
export default BedBuilder;
