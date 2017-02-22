import React from 'react';
import BedBuilderStep from './BedBuilderStep';
import BedBuilderActions from '../../actions/BedBuilderActions';

class BedBuilderStepMoisture extends BedBuilderStep {
  handleSoilChange = (event) => {
    BedBuilderActions.soilChange(event.target.value);
  }

  handleWateredChange = (event) => {
    BedBuilderActions.wateredChange(event.target.value == 'on');
  }

  render() {
    return(
      <div className={`step step-moisture ${this.stepStateClass()}` }>
        <div className='step-title' onClick={() => {this.selectStep('moisture')}}>Soil Moisture</div>
        <div className='step-contents'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='title'>
                <i className="fa fa-tint" aria-hidden="true"></i>&nbsp;
                How moist is the soil in this bed?
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-11 col-sm-offset-1'>
              <div className='form-group'>
                <div className="radio">
                  <label>
                    <input type="radio"
                           value="wet"
                           checked={this.state.bed.soil == 'wet'}
                           onChange={this.handleSoilChange} />
                    Wet
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           value="moderate"
                           checked={this.state.bed.soil == 'moderate'}
                           onChange={this.handleSoilChange} />
                    Moderate
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           value="dry"
                           checked={this.state.bed.soil == 'dry'}
                           onChange={this.handleSoilChange} />
                    Dry
                  </label>
                </div>
              </div>

              <hr/>

              <div className="checkbox">
                <label>
                  <input type="checkbox"
                         checked={this.state.bed.watered}
                         onChange={this.handleWateredChange} /> This bed has watering equipment
                </label>
                <p className='help-block'>Sprinkler, drip irrigation system, etc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BedBuilderStepMoisture;
