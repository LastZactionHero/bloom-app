import React from 'react';

class PlantPreview extends React.Component {
  render() {
    return(
      <div className='plant-preview'>
        <div className='row'>
          <div className='col-sm-6'>
            <div className='image' src={this.props.plant.image_url}
                 style={{backgroundImage: `url("${this.props.plant.image_url}")`}}/>
          </div>
          <div className='col-sm-6'>
            <p>{this.props.plant.description}</p>

            <hr />

            <div className='row'>
              <div className='col-sm-6'><strong>Average Width:</strong></div>
              <div className='col-sm-6'>{this.props.plant.size.avg_width}&quot;</div>
            </div>
            <div className='row'>
              <div className='col-sm-6'><strong>Average Height:</strong></div>
              <div className='col-sm-6'>{this.props.plant.size.avg_height}&quot;</div>
            </div>
            {this.props.plant.leave_type ?
              <div className='row'>
                <div className='col-sm-6'><strong>Leaf Type:</strong></div>
                <div className='col-sm-6'>{this.props.plant.leave_type.name}</div>
              </div> : null}
            {this.props.plant.flower_color ?
              <div className='row'>
                <div className='col-sm-6'><strong>Flower Color:</strong></div>
                <div className='col-sm-6'>{this.props.plant.flower_color.name}</div>
              </div> : null}
            {this.props.plant.foliage_color ?
              <div className='row'>
                <div className='col-sm-6'><strong>Foliage Color:</strong></div>
                <div className='col-sm-6'>{this.props.plant.foliage_color.name}</div>
              </div> : null}
            {this.props.plant.growth_rate ?
              <div className='row'>
                <div className='col-sm-6'><strong>Growth Rate:</strong></div>
                <div className='col-sm-6'>{this.props.plant.growth_rate.name}</div>
              </div> : null}
            <br/>
            <strong>Useful for: </strong>
            <ul className='usages'>
              {this.props.plant.usages.map( (usage) => {
                return <li key={`usage_${usage.id}`}>{usage.name}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PlantPreview;
