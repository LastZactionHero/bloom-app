import React from 'react';
import TemplateViewer from './Render/TemplateViewer';

class BedPlantsSelect extends React.Component {
  render() {
    return(
      <div>
        <div>Bed Plants Select {this.props.bed.id}</div>
        <TemplateViewer bed={this.props.bed} />
      </div>
    )
  }
}

export default BedPlantsSelect;