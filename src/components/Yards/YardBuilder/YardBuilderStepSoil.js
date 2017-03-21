import React from 'react';
import YardBuilderStep from './YardBuilderStep';
import YardBuilderActions from 'actions/YardBuilderActions';

class YardBuilderStepSoil extends YardBuilderStep {
  handleSoilChange = (event) => {
    YardBuilderActions.soilChange(event.target.value);
  }

  render() {
    return(
      <div className={`step step-soil ${this.stepStateClass()}` }>
        <div className='step-title'  onClick={() => {this.selectStep('soil')}}>Soil Moisture</div>
        <div className='step-contents'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='title'>
                <i className="fa fa-tint" aria-hidden="true"></i>&nbsp;
                How moist is your soil?
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
                           checked={this.state.yard.soil == 'wet'}
                           onChange={this.handleSoilChange} />
                    Wet
                  </label>
                  <div className='hint'>Soil stays wet long after watering. Poor drainage or in a low-lying area.</div>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           value="normal"
                           checked={this.state.yard.soil == 'normal'}
                           onChange={this.handleSoilChange} />
                    Normal
                  </label>
                  <div className='hint'>Soil usually has some moisture, but is not constantly soggy or wet. Good drainage.</div>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           value="dry"
                           checked={this.state.yard.soil == 'dry'}
                           onChange={this.handleSoilChange} />
                    Dry
                  </label>
                  <div className='hint'>Very little moisture most of the time.</div>
                </div>
              </div>
              <hr/>
              <div className='step-hint'>You&apos;ll specify soil moisture and watering bed-by-bed a bit later.</div>

              {this.state.steps.soil.complete ?
                <div className='text-right'>
                  <a className='btn btn-primary'
                     href='javascript:void(0)'
                     onClick={this.nextStep}>Next</a>
                </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default YardBuilderStepSoil;
