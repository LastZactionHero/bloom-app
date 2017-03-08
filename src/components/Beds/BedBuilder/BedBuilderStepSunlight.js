import React from 'react';
import BedBuilderStep from './BedBuilderStep';
import BedBuilderActions from '../../../actions/BedBuilderActions';

class BedBuilderStepSunlight extends BedBuilderStep {
  handleSunlightMorningChange(event) {
    BedBuilderActions.sunlightMorningChange(event.target.value == 'true');
  }
  handleSunlightAfternoonChange(event) {
    BedBuilderActions.sunlightAfternoonChange(event.target.value == 'true');
  }

  render() {
    return(
      <div className={`step step-sunlight ${this.stepStateClass()}` }>
        <div className='step-title' onClick={() => {this.selectStep('sunlight')}}>Sunlight</div>
        <div className='step-contents'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='title'>
                <i className="fa fa-sun-o" aria-hidden="true"></i>&nbsp;
                How much sunlight does this bed receive during the day?
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-11 col-sm-offset-1'>
              <div className='form'>
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className='step-hint'>
                      We guessed about sunlight based on the side of the house.
                    </div>

                    <div className='form-group'>
                      <div><label>Does this bed receive sunlight in the morning?</label></div>
                      <div className="radio">
                        <label>
                          <input type="radio"
                                 value={true}
                                 checked={this.state.bed.sunlight_morning == true}
                                 onChange={this.handleSunlightMorningChange} />
                          Yes
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio"
                                 value={false}
                                 checked={this.state.bed.sunlight_morning == false}
                                 onChange={this.handleSunlightMorningChange} />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-12'>
                    <div className='form-group'>
                      <div><label>Does this bed receive sunlight in the afternoon?</label></div>
                      <div className="radio">
                        <label>
                          <input type="radio"
                                 value={true}
                                 checked={this.state.bed.sunlight_afternoon == true}
                                 onChange={this.handleSunlightAfternoonChange} />
                          Yes
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio"
                                 value={false}
                                 checked={this.state.bed.sunlight_afternoon == false}
                                 onChange={this.handleSunlightAfternoonChange} />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.steps.sunlight.complete ?
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

export default BedBuilderStepSunlight;
