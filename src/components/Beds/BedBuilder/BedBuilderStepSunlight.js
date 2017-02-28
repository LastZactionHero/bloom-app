import React from 'react';
import BedBuilderStep from './BedBuilderStep';
import BedBuilderActions from '../../../actions/BedBuilderActions';

class BedBuilderStepSunlight extends BedBuilderStep {
  handleSunlightMorningChange(sunlight) {
    BedBuilderActions.sunlightMorningChange(sunlight);
  }
  handleSunlightAfternoonChange(sunlight) {
    BedBuilderActions.sunlightAfternoonChange(sunlight);
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
                    <div className='form-group'>
                      <div><label>Morning</label></div>
                      <h4>Direct Sunlight</h4>
                      <div className="btn-group" role="group">
                        <button type="button"
                                onClick={ () => {this.handleSunlightMorningChange('full_sun')} }
                                className={`btn ${this.state.bed.sunlight_morning == 'full_sun' ? 'btn-primary' : 'btn-default'}`}>Full Sun</button>
                        <button type="button"
                                onClick={ () => {this.handleSunlightMorningChange('partial_sun')} }
                                className={`btn ${this.state.bed.sunlight_morning == 'partial_sun' ? 'btn-primary' : 'btn-default'}`}>Partial Sun</button>
                        <button type="button"
                                onClick={ () => {this.handleSunlightMorningChange('partial_shade')} }
                                className={`btn ${this.state.bed.sunlight_morning == 'partial_shade' ? 'btn-primary' : 'btn-default'}`}>Partial Shade</button>
                        <button type="button"
                                onClick={ () => {this.handleSunlightMorningChange('full_shade')} }
                                className={`btn ${this.state.bed.sunlight_morning == 'full_shade' ? 'btn-primary' : 'btn-default'}`}>Full Shade</button>
                      </div>
                      <h4>Filtered Sunlight</h4>
                      <div className='btn-group' role='group'>
                        <button type="button"
                                onClick={ () => {this.handleSunlightMorningChange('filtered_sun')} }
                                className={`btn ${this.state.bed.sunlight_morning == 'filtered_sun' ? 'btn-primary' : 'btn-default'}`}>Filtered Sun</button>
                        <button type="button"
                                onClick={ () => {this.handleSunlightMorningChange('filtered_shade')} }
                                className={`btn ${this.state.bed.sunlight_morning == 'filtered_shade' ? 'btn-primary' : 'btn-default'}`}>Filtered Shade</button>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-12'>
                    <div className='form-group'>
                      <div><label>Afternoon</label></div>
                      <h4>Direct Sunlight</h4>
                      <div className="btn-group" role="group">
                        <button type="button"
                                onClick={ () => {this.handleSunlightAfternoonChange('full_sun')} }
                                className={`btn ${this.state.bed.sunlight_afternoon == 'full_sun' ? 'btn-primary' : 'btn-default'}`}>Full Sun</button>
                        <button type="button"
                                onClick={ () => {this.handleSunlightAfternoonChange('partial_sun')} }
                                className={`btn ${this.state.bed.sunlight_afternoon == 'partial_sun' ? 'btn-primary' : 'btn-default'}`}>Partial Sun</button>
                        <button type="button"
                                onClick={ () => {this.handleSunlightAfternoonChange('partial_shade')} }
                                className={`btn ${this.state.bed.sunlight_afternoon == 'partial_shade' ? 'btn-primary' : 'btn-default'}`}>Partial Shade</button>
                        <button type="button"
                                onClick={ () => {this.handleSunlightAfternoonChange('full_shade')} }
                                className={`btn ${this.state.bed.sunlight_afternoon == 'full_shade' ? 'btn-primary' : 'btn-default'}`}>Full Shade</button>
                      </div>
                      <h4>Filtered Sunlight</h4>
                      <div className='btn-group' role='group'>
                        <button type="button"
                                onClick={ () => {this.handleSunlightAfternoonChange('filtered_sun')} }
                                className={`btn ${this.state.bed.sunlight_afternoon == 'filtered_sun' ? 'btn-primary' : 'btn-default'}`}>Filtered Sun</button>
                        <button type="button"
                                onClick={ () => {this.handleSunlightAfternoonChange('filtered_shade')} }
                                className={`btn ${this.state.bed.sunlight_afternoon == 'filtered_shade' ? 'btn-primary' : 'btn-default'}`}>Filtered Shade</button>
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
