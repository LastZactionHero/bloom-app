import React from 'react';

class TemplatePlant extends React.Component {
  render(){
    return(
      <div className='row template-plant'
        onMouseEnter={() => {this.props.onHoverStart(this.props.templatePlant)}}
        onMouseLeave={() => {this.props.onHoverEnd(this.props.templatePlant)}}>
        <div className='col-xs-1 plant-label'>
          {this.props.templatePlant.label}
        </div>
        <div className='col-xs-11 col-sm-5'>
          <div className='plant-type'>{this.props.templatePlant.plant_type}</div>
          <div className='plant-tooltip'>{this.props.templatePlant.tooltip}</div>
        </div>
        <div className='col-xs-12 col-sm-6'>
          {this.props.selectedPlant ?
            <div className='selected'>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='selected-plant-name'>{this.props.selectedPlant.common_name}</div>
                </div>
                <div className='col-sm-4'>
                  <div className='image' style={{backgroundImage: `url("${this.props.selectedPlant.image_url}")`}} />
                </div>
                <div className='col-sm-4'>
                  <a href='javascript:void(0)'
                     className='btn btn-danger'
                     onClick={this.props.onStartSearch}>
                    <i className="fa fa-search" aria-hidden="true" />
                    Replace plant
                  </a>
                </div>
              </div>
            </div>
            :
            <div className='unselected'>
              <a href='javascript:void(0)'
                 className='btn btn-primary'
                 onClick={this.props.onStartSearch}>
                <i className="fa fa-search" aria-hidden="true" />
                Select a plant
              </a>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default TemplatePlant;
