import React from 'react';
import TemplateViewer from './Render/TemplateViewer';
import YardsStore from 'stores/YardsStore';
import StringUtil from '../../util/string';
import TemplatePlant from './Plants/TemplatePlant'
import Loading from 'components/Common/Loading'
import TemplateActions from 'actions/TemplateActions';
import BasicTemplateSearch from 'components/PlantSearch/BasicTemplateSearch';

class BedPlantsSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = YardsStore.getState();

    this.state.viewMode = 'list';
    this.state.activeTemplatePlant = null;
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

  startSearch = (templatePlant) => {
    this.setState({viewMode: 'search', activeTemplatePlant: templatePlant});
  }

  finishSearch = () => {
    this.setState({viewMode: 'list'});
  }

  render() {
    let contents = (viewMode) => {
      switch(viewMode) {
        case 'list':
          return <div>
            <div>Bed Plants Select {this.props.bed.id}</div>
            <h3>We recommend {StringUtil.pluralize(this.props.bed.meta.templatePlants.length, 'plant', 'plants')} for your bed:</h3>
            <div>
              {this.props.bed.meta.templatePlants.map( (templatePlant) => {
                return <TemplatePlant key={`plant_${templatePlant.label}`}
                                      templatePlant={templatePlant}
                                      onStartSearch={ () => { this.startSearch(templatePlant) } } />
              })}
            </div>
            <hr/>
            <TemplateViewer bed={this.props.bed} renderWidth={700} renderHeight={700} />
          </div>;
        case 'search':
          return <BasicTemplateSearch onSelect={this.finishSearch}
                                      templatePlant={this.state.activeTemplatePlant} />
      }
    };

    return(
      <div>
        {this.props.bed.meta ? contents(this.state.viewMode) : <Loading message='Loading plants' />}
      </div>
    )
  }
}

export default BedPlantsSelect;
