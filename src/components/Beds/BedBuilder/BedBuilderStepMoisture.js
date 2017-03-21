import React from 'react';
import BedBuilderStep from './BedBuilderStep';
import BedBuilderActions from '../../../actions/BedBuilderActions';

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
              <div className='step-hint'>
                We guessed soil moisture from your yard. Please double check it is correct for this bed.
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
                  <div className='hint'>Soil stays wet long after watering. Poor drainage or in a low-lying area.</div>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           value="normal"
                           checked={this.state.bed.soil == 'normal'}
                           onChange={this.handleSoilChange} />
                    Normal
                  </label>
                  <div className='hint'>Soil usually has some moisture, but is not constantly soggy or wet. Good drainage.</div>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           value="dry"
                           checked={this.state.bed.soil == 'dry'}
                           onChange={this.handleSoilChange} />
                    Dry
                  </label>
                  <div className='hint'>Very little moisture most of the time.</div>
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
                <div className='step-hint'>
                  If checked, we&apos;ll include plants that require more soil moisture.
                  Make sure to review the plant&apos;s care instructions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BedBuilderStepMoisture;
