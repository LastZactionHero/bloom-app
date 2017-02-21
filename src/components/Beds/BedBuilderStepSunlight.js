import React from 'react';
import BedBuilderStep from './BedBuilderStep';

class BedBuilderStepSunlight extends BedBuilderStep {
  render() {
    return(
      <div className={`step step-sunlight ${this.stepStateClass()}` }>
        <div className='step-title' onClick={() => {this.selectStep('location')}}>Sunlight</div>
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
                    <div className='form-group'>
                      <div><label>Morning</label></div>
                      <h4>Direct Sunlight</h4>
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default">Full Sun</button>
                        <button type="button" className="btn btn-default">Partial Sun</button>
                        <button type="button" className="btn btn-default">Partial Shade</button>
                        <button type="button" className="btn btn-default">Full Shade</button>
                      </div>
                      <h4>Filtered Sunlight</h4>
                      <div className='btn-group' role='group'>
                        <button type="button" className="btn btn-default">Filtered Sun</button>
                        <button type="button" className="btn btn-default">Filtered Shade</button>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-12'>
                    <div className='form-group'>
                      <div><label>Afternoon</label></div>
                      <h4>Direct Sunlight</h4>
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default">Full Sun</button>
                        <button type="button" className="btn btn-default">Partial Sun</button>
                        <button type="button" className="btn btn-default">Partial Shade</button>
                        <button type="button" className="btn btn-default">Full Shade</button>
                      </div>
                      <h4>Filtered Sunlight</h4>
                      <div className='btn-group' role='group'>
                        <button type="button" className="btn btn-default">Filtered Sun</button>
                        <button type="button" className="btn btn-default">Filtered Shade</button>
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

export default BedBuilderStepSunlight;
