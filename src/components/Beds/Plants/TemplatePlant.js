import React from 'react';

class TemplatePlant extends React.Component {
  render(){
    return(
      <div className='row template-plant'>
        <div className='col-xs-1 plant-label'>
          {this.props.templatePlant.label}
        </div>
        <div className='col-xs-11 col-sm-5'>
          <div className='plant-type'>{this.props.templatePlant.plant_type}</div>
          <div className='plant-tooltip'>{this.props.templatePlant.tooltip}</div>
        </div>
        <div className='col-xs-12 col-sm-6'>
          <div className='unselected'>
            <a href='javascript:void(0)'
               className='btn btn-primary'
               onClick={this.props.onStartSearch}>
              <i className="fa fa-search" aria-hidden="true" />
              Find a specific plant
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default TemplatePlant;
