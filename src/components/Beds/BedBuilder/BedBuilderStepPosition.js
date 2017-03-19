import React from 'react';
import BedBuilderStep from './BedBuilderStep';
import BedBuilderActions from '../../../actions/BedBuilderActions';

class BedBuilderStepPosition extends BedBuilderStep {
  handleOrientationChange(event) {
    BedBuilderActions.orientationChange(event.target.value);
  }

  handleAttachedToHouseChange(event) {
    BedBuilderActions.attachedToHouseChange(event.target.value == 'true')
  }

  render() {
    return(
      <div className={`step step-position ${this.stepStateClass()}` }>
        <div className='step-title' onClick={() => {this.selectStep('position')}}>Relation to House</div>
        <div className='step-contents'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='title'>
                <i className="fa fa-home" aria-hidden="true"></i>&nbsp;
                Where is the garden bed relative to your house?
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-11 col-sm-offset-1'>
              <div className='form'>
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>Is the bed connected to your house?</label>
                      <div className="radio">
                        <label>
                          <input type="radio"
                                 value="true"
                                 checked={this.state.bed.attached_to_house === true}
                                 onChange={this.handleAttachedToHouseChange} />
                          Yes, it&apos;s connected to the house.
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio"
                                 value="false"
                                 checked={this.state.bed.attached_to_house === false}
                                 onChange={this.handleAttachedToHouseChange} />
                          No, it&apos;s somewhere else in the yard.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <label>What side of the house is it on?</label>
                    <div className='form-group'>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                     value="north"
                                     checked={this.state.bed.orientation == 'north'}
                                     onChange={this.handleOrientationChange} />
                              North
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                     value="south"
                                     checked={this.state.bed.orientation == 'south'}
                                     onChange={this.handleOrientationChange} />
                              South
                            </label>
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                     value="east"
                                     checked={this.state.bed.orientation == 'east'}
                                     onChange={this.handleOrientationChange} />
                              East
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                     value="west"
                                     checked={this.state.bed.orientation == 'west'}
                                     onChange={this.handleOrientationChange} />
                              West
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.steps.position.complete ?
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

export default BedBuilderStepPosition;
