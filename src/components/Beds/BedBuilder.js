import React from 'react';
import BedBuilderStore from '../../stores/BedBuilderStore';
import BedBuilderStepDimensions from './BedBuilderStepDimensions';
import BedBuilderStepPosition from './BedBuilderStepPosition';
import BedBuilderStepSunlight from './BedBuilderStepSunlight';
import BedBuilderStepMoisture from './BedBuilderStepMoisture';
import BedBuilderActions from '../../actions/BedBuilderActions';
import { browserHistory } from 'react-router'

class BedBuilder extends React.Component {
  constructor() {
    super();
    this.state =  BedBuilderStore.getState();
  }
  componentDidMount = () => {
    BedBuilderStore.listen(this.onChange);
    setTimeout( () => {
      BedBuilderActions.yardIdChange(this.props.params.yard_id);
    })
  }
  componentWillUnmount = () => {
    BedBuilderStore.unlisten(this.onChange);
  }
  onChange = (state) => {
    this.setState(state);
  }
  createBed = () => {
    if(!this.state.submitting) {
      BedBuilderActions.startCreateBed(this.state.bed);
      browserHistory.replace('/dashboard/yards/' + this.props.params.yard_id); // Probably a bad spot for this...
    }
  }

  render() {
    return(
      <div className='builder bed-builder'>
        <div>Bed Builder, Yard #{this.state.bed.yard_id}</div>
        <div>
          <BedBuilderStepDimensions active={this.state.activeStep == 'dimensions'} incomplete={!this.state.steps.dimensions.complete} />
          <BedBuilderStepPosition   active={this.state.activeStep == 'position'} incomplete={!this.state.steps.position.complete} />
          <BedBuilderStepSunlight   active={this.state.activeStep == 'sunlight'} incomplete={!this.state.steps.sunlight.complete} />
          <BedBuilderStepMoisture   active={this.state.activeStep == 'moisture'} incomplete={!this.state.steps.moisture.complete}  />
        </div>
        {this.state.allComplete ?
          <div className='text-right'>
            <div className='text-right'>
              <a className={`btn btn-success ${this.state.submitting ? 'disabled' : null} `}
                 href='javascript:void(0)'
                 onClick={this.createBed}>Pick a Design</a>
            </div>
          </div>
          : null }
      </div>
    )
  }
}
export default BedBuilder;
