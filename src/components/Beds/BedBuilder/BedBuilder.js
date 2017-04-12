import React from 'react';
import { browserHistory } from 'react-router'
import BedBuilderStore from '../../../stores/BedBuilderStore';
import SessionStore from 'stores/SessionStore';
import BedBuilderStepDimensions from './BedBuilderStepDimensions';
import BedBuilderStepPosition from './BedBuilderStepPosition';
import BedBuilderStepSunlight from './BedBuilderStepSunlight';
import BedBuilderStepMoisture from './BedBuilderStepMoisture';
import BedBuilderActions from '../../../actions/BedBuilderActions';
import UpgradeModal from 'components/Upgrade/UpgradeModal';

class BedBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state =  BedBuilderStore.getState();
  }
  componentDidMount = () => {
    setTimeout( () => {
      BedBuilderActions.yardChange(this.props.yard);
    })
    BedBuilderStore.listen(this.onChange);
    BedBuilderActions.reset();
  }
  componentWillUnmount = () => {
    BedBuilderStore.unlisten(this.onChange);
  }
  onChange = (state) => {
    this.setState(state);
  }
  createBed = () => {
    if(SessionStore.getState().user.account.status == 'trial') {
      this.setState({showUpgradeModal: true});
    } else if(!this.state.submitting) {
      BedBuilderActions.startCreateBed(this.state.bed);
    }
  }

  render() {
    return(
      <div>
        <div className='builder bed-builder'>
          <div>
            <BedBuilderStepDimensions active={this.state.activeStep == 'dimensions'} incomplete={!this.state.steps.dimensions.complete} yard={this.props.yard} />
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
        {this.state.showUpgradeModal ? <UpgradeModal cancel={() => {browserHistory.replace(`/dashboard/search`);}}/> : null}
      </div>
    )
  }
}
export default BedBuilder;
