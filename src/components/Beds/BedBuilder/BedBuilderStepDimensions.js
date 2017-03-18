import React from 'react';
import BedBuilderStep from './BedBuilderStep';
import BedBuilderActions from '../../../actions/BedBuilderActions';

class BedBuilderStepDimensions extends BedBuilderStep {
  handleNameChange = (event) => {
    BedBuilderActions.nameChange(event.target.value);
  }
  handleWidthChange = (event) => {
    BedBuilderActions.widthChange(event.target.value);
  }
  handleDepthChange = (event) => {
    BedBuilderActions.depthChange(event.target.value);
  }

  render() {
    const firstBed = this.props.yard.beds.length == 0;

    return(
      <div className={`step step-dimensions ${this.stepStateClass()}` }>
        <div className='step-title' onClick={() => {this.selectStep('dimensions')}}>Dimensions</div>
        <div className='step-contents'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='title'>
                <i className="fa fa-leaf" aria-hidden="true"></i>&nbsp;
                { firstBed ? 'Let\'s design your first garden bed' : 'Add another garden bed' }
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-10 col-sm-offset-1'>
              {firstBed ?
                <div className='step-hint'>
                  Pick one garden bed in your yard to start with, and answer the questions below. We&apos;ll use this to suggest plants and designs.
                </div> : null}

              <div className='form'>
                <div className='form-group'>
                  <label>Name</label>
                  <input type='text'
                         className='form-control name'
                         placeholder='Front Yard, Left of the driveway'
                         value={this.state.bed.name}
                         onChange={this.handleNameChange} />
                  <p className='help-block'>A unique name for identifying this garden bed later.</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-3'>
                  <label>Width (feet)</label>
                  <input type='text'
                         className='form-control'
                         value={this.state.bed.width}
                         onChange={this.handleWidthChange}/>
                  <p className='form-error'>{this.state.errors.width}</p>
                </div>
                <div className='col-sm-3'>
                  <label>Depth (feet)</label>
                  <input type='text'
                         className='form-control'
                         value={this.state.bed.depth}
                         onChange={this.handleDepthChange}/>
                  <p className='form-error'>{this.state.errors.depth}</p>
                </div>
                <div className='col-sm-12'>
                  <p className='help-block'>Approximate size (2' - 100'), used to recommend styles and plant placement.</p>
                </div>
              </div>

              <div className='step-hint'>
                Away from the house? Try some different sizes, like <strong>20 ft wide, 5 ft deep</strong>.
                <br/>
                Forgot your tape measure? Here&apos;s a tip: <strong>a standard rake or shovel about 5 ft long.</strong>
              </div>

              {this.state.steps.dimensions.complete ?
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

export default BedBuilderStepDimensions;
