import React from 'react';
import YardBuilderStepSoil from './YardBuilderStepSoil'
import YardBuilderStepLocation from './YardBuilderStepLocation';
import YardBuilderStepPlantPreferences from './YardBuilderStepPlantPreferences';
import YardBuilderStore from 'stores/YardBuilderStore';
import YardBuilderActions from 'actions/YardBuilderActions';
import { browserHistory } from 'react-router'

class YardBuilder extends React.Component {
  constructor() {
    super();
    this.state = YardBuilderStore.getState();
    setTimeout(() => { YardBuilderActions.reset(); })
  }

  componentDidMount = () => {
    YardBuilderStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    YardBuilderStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  createYard = () => {
    if(!this.state.submitting) {
      YardBuilderActions.startCreateYard(this.state.yard);
    }
  }

  render() {
    return(
      <div className='builder yard-builder'>
        <div>
          <YardBuilderStepLocation active={this.state.activeStep == 'location'} incomplete={!this.state.steps.location.complete} />
          <YardBuilderStepSoil active={this.state.activeStep == 'soil'} incomplete={!this.state.steps.soil.complete}  />
          <YardBuilderStepPlantPreferences active={this.state.activeStep == 'plant_preferences'} incomplete={!this.state.steps.plant_preferences.complete}  />
        </div>
        {this.state.allComplete ?
          <div className='text-right'>
            <div className='text-right'>
              <a className={`btn btn-success ${this.state.submitting ? 'disabled' : null} `}
                 href='javascript:void(0)'
                 onClick={this.createYard}>Start Designing Beds</a>
            </div>
          </div>
          : null }
      </div>
    )
  }
}

export default YardBuilder;
