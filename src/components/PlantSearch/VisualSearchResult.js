import React from 'react';

class VisualSearchResult extends React.Component {
  render() {
    return(
      <div className='visual-search-result col-md-2'
           style={{backgroundImage: `url("${this.props.plant.image_url}")`}}
           onClick={() => { this.props.onSelect(this.props.plant) } }>
        <div className='plant-name'>{this.props.plant.common_name}</div>
      </div>
    )
  }
}

export default VisualSearchResult;
