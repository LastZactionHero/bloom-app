import React from 'react';
import BedBuilderStep from './BedBuilderStep';

class BedBuilderStepPosition extends BedBuilderStep {
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
                      <label>Is the connected to your house?</label>
                      <div className="radio">
                        <label>
                          <input type="radio"
                                 value="true"
                                 checked={true}
                                 onChange={null} />
                          Yes, it&apos;s connected to the house.
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input type="radio"
                                 value="true"
                                 checked={false}
                                 onChange={null} />
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
                                     value="true"
                                     checked={false}
                                     onChange={null} />
                              North
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                     value="true"
                                     checked={false}
                                     onChange={null} />
                              South
                            </label>
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                     value="true"
                                     checked={false}
                                     onChange={null} />
                              East
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                     value="true"
                                     checked={false}
                                     onChange={null} />
                              West
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BedBuilderStepPosition;
