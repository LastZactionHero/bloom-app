import React from 'react';
import TemplateViewer from './Render/TemplateViewer';
import YardsStore from 'stores/YardsStore';
import StringUtil from '../../util/string';
import TemplatePlant from './Plants/TemplatePlant'
import Loading from 'components/Common/Loading'
import TemplateActions from 'actions/TemplateActions';

class BedPlantsSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = YardsStore.getState();
  }

  componentDidMount = () => {
    YardsStore.listen(this.onChange);
    setTimeout( () => { TemplateActions.fetchPlacements(this.props.bed); })
  }

  componentWillUnmount = () => {
    YardsStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  render() {
    return(
      <div>{this.props.bed.meta ?
        <div>
          <div>Bed Plants Select {this.props.bed.id}</div>
          <h3>We recommend {StringUtil.pluralize(this.props.bed.meta.templatePlants.length, 'plant', 'plants')} for your bed:</h3>
          <div>
            {this.props.bed.meta.templatePlants.map( (templatePlant) => {
              return <TemplatePlant key={`plant_${templatePlant.label}`} templatePlant={templatePlant} />
            })}
          </div>

          <hr/>

          <TemplateViewer bed={this.props.bed} renderWidth={700} renderHeight={700} />
        </div> : <Loading message='Loading plants' />}
      </div>
    )
  }
}

export default BedPlantsSelect;
