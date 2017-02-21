import React from 'react';
import BedBuilderStep from './BedBuilderStep';

class BedBuilderStepDimensions extends BedBuilderStep {
  render() {
    return(
      <div className={`step step-dimensions ${this.stepStateClass()}` }>
        <div className='step-title' onClick={() => {this.selectStep('location')}}>Dimensions</div>
        <div className='step-contents'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='title'>
                <i className="fa fa-leaf" aria-hidden="true"></i>&nbsp;
                Create a new garden bed
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-10 col-sm-offset-1'>
              <div className='form'>
                <div className='form-group'>
                  <label>Name</label>
                  <input type='text' className='form-control name' placeholder='Front Yard, Left of the driveway'/>
                  <p className='help-block'>A unique name for identifying this garden bed later.</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-3'>
                  <label>Width (feet)</label>
                  <input type='text' className='form-control'/>
                </div>
                <div className='col-sm-3'>
                  <label>Depth (feet)</label>
                  <input type='text' className='form-control'/>
                </div>
                <div className='col-sm-12'>
                  <p className='help-block'>Approximate size, used to recommend styles and plant placement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BedBuilderStepDimensions;
