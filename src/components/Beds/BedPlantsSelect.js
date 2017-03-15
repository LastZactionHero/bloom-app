import React from 'react';
import YardsStore from 'stores/YardsStore';
import BedActions from 'actions/BedActions';
import TemplateActions from 'actions/TemplateActions';
import StringUtil from '../../util/string';
import TemplateViewer from './Render/TemplateViewer';
import TemplatePlant from './Plants/TemplatePlant'
import Loading from 'components/Common/Loading'
import BasicTemplateSearch from 'components/PlantSearch/BasicTemplateSearch';
import { Link } from 'react-router'

class BedPlantsSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = YardsStore.getState();

    this.state.viewMode = 'list';
    this.state.activeTemplatePlant = null;
    this.state.hoverTemplatePlant = null;
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

  finishSearch = (templatePlant, plant) => {
    this.setState({viewMode: 'list'});
    BedActions.mapTemplatePlant(this.props.bed, templatePlant, plant);

    setTimeout( () => { TemplateActions.fetchPlacements(this.props.bed); }); // redraw
  }

  selectionFinished = () => {
    let finished = true;
    const labels = new Set(this.props.bed.template_placements.map((p) => {return p.plant.label}));
    labels.forEach((label) => {
      if(this.props.bed.template_plant_mapping[label] == undefined){
        finished = false;
      }
    });

    return finished;
  }

  startHover = (templatePlant) => {
    this.setState({hoverTemplatePlant: templatePlant});
  }

  endHover = (templatePlant) => {
    this.setState({hoverTemplatePlant: null});
  }

  render() {
    let contents = (viewMode) => {
      switch(viewMode) {
        case 'list':
          return <div>
            <div>Bed Plants Select {this.props.bed.id}</div>
            <h3>We recommend {StringUtil.pluralize(this.props.bed.meta.templatePlants.length, 'plant', 'plants')} for your bed:</h3>
            <div className='template-plants-list'>
              {this.props.bed.meta.templatePlants.map( (templatePlant) => {
                return <TemplatePlant key={`plant_${templatePlant.label}`}
                                      templatePlant={templatePlant}
                                      selectedPlant={this.props.bed.template_plant_mapping[templatePlant.label]}
                                      onHoverStart={this.startHover}
                                      onHoverEnd={this.endHover}
                                      onStartSearch={ () => { this.startSearch(templatePlant) } } />
              })}
            </div>

            {this.selectionFinished() ?
              <div className='alert alert-success'>
                Looks great! You can update your choices,&nbsp;
                <Link to={{pathname: `/dashboard/yards/${this.props.bed.yard_id}`}}>review your yard</Link>,
                or <Link to={{pathname: `/dashboard/yards/${this.props.bed.yard_id}/beds/new`}}>start another bed</Link>.
              </div>
              : null}
            <hr/>

            <TemplateViewer bed={this.props.bed} legend={true} selecting={true} highlightTemplatePlant={this.state.hoverTemplatePlant}/>
          </div>;
        case 'search':
          return <BasicTemplateSearch bed={this.props.bed}
                                      yard={this.props.yard}
                                      onSelect={this.finishSearch}
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
