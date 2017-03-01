import React from 'react';
import TemplateViewer from './Render/TemplateViewer';
import YardsStore from 'stores/YardsStore';
import StringUtil from '../../util/string';
import TemplatePlant from './Plants/TemplatePlant'

class BedPlantsSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = YardsStore.getState();
  }

  componentDidMount = () => {
    YardsStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    YardsStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  render() {
    return(
      <div>
        <div>Bed Plants Select {this.props.bed.id}</div>
        <h3>We recommend {StringUtil.pluralize(this.state.templatePlants.length, 'plant', 'plants')} for your bed:</h3>
        <div>
          {this.state.templatePlants.map( (templatePlant) => {
            return <TemplatePlant key={`plant_${templatePlant.label}`} templatePlant={templatePlant} />
          })}
        </div>

        <hr/>

        <TemplateViewer bed={this.props.bed} />
      </div>
    )
  }
}

export default BedPlantsSelect;
