import React from 'react';

class PlantPreview extends React.Component {
  render() {
    return(
      <div>
        <h3>{this.props.plant.common_name}</h3>
        <a className='btn btn-success'
           onClick={ () => {this.props.onSelect(this.props.plant)} }>Select this Plant</a>
        <a className='btn btn-default'
           onClick={this.props.onCancel}>Cancel</a>
      </div>
    )
  }
}

export default PlantPreview;
