import React from 'react';
import YardBuilderStep from './YardBuilderStep';
import YardBuilderActions from 'actions/YardBuilderActions';

class YardBuilderStepLocation extends YardBuilderStep {
  handleZipcodeChange = (event) => {
    YardBuilderActions.zipcodeChange(event.target.value);
  }

  render() {
    return(
      <div className={`step step-location ${this.stepStateClass()}` }>
        <div className='step-title' onClick={() => {this.selectStep('location')}}>Yard Location</div>
        <div className='step-contents'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='title'>
                <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
                Where is your yard?
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-11 col-sm-offset-1'>
              <div className='form-inline'>
                <div className='form-group'>
                  <label>Zipcode</label>
                  <input type='text'
                         className='form-control zipcode'
                         placeholder=''
                         value={this.state.yard.zipcode}
                         onChange={this.handleZipcodeChange}/>
                </div>
              </div>


              {this.state.yard.zone ?
                <div>
                  <hr/>
                  {this.state.yard.zone == 'invalid' ?
                    <div className='alert alert-danger'>Hmm, we couldn&apos;t find that zipcode. Are you sure that&apos;s correct?</div> :
                    <div>
                      <p>
                        It looks like you&apos;re in <strong>Zone {this.state.yard.zone}</strong>.
                        Great- that&apos;s the best zone.
                      </p>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div className='protip'>
                            <div className='protip-title'>What is a zone?</div>
                            <div>
                              The <strong>USDA Plant Hardiness Zone</strong> is the standard that determines which
                              plants are most likely to thrive at a location.
                              Zones are based on the average minimum winter temperature, in 10-degree F ranges.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>: null
              }

              {this.state.steps.location.complete ?
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

export default YardBuilderStepLocation;
