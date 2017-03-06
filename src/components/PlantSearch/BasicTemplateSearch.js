import React from 'react'
import PlantSearchActions from 'actions/PlantSearchActions';
import PlantSearchStore from 'stores/PlantSearchStore';
import Loading from 'components/Common/Loading';
import VisualSearchResult from './VisualSearchResult';
import PlantPreview from './PlantPreview';

class BasicTemplateSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlantSearchStore.getState();
    this.state.plantPreview = null;
  }

  componentDidMount = () => {
    PlantSearchStore.listen(this.onChange);
    PlantSearchActions.startFetchResults(this.props.templatePlant.search_query, 0);
  }

  componentWillUnmount = () => {
    PlantSearchStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  showPlantPreview = (plant) => {
    this.setState({plantPreview: plant});
  }

  onPlantSelectConfirm = (plant) => {
    this.props.onSelect(this.props.templatePlant, plant);
  }

  onPlantSelectCancel = () => {
    this.setState({plantPreview: null});
  }

  render() {
    return(
      <div className='plant-search'>
        <div className='basic-template-search'>
          <h3>Basic Template Search: {this.props.templatePlant.plant_type}</h3>
          <p>{this.props.templatePlant.tooltip}</p>
          <p>{JSON.stringify(this.props.templatePlant.search_query)}</p>

          {this.state.loading.results ?
            <Loading message='Searching' /> :
            <div>
              <div>
                {this.state.plantPreview ?
                  <PlantPreview plant={this.state.plantPreview}
                                onSelect={this.onPlantSelectConfirm}
                                onCancel={this.onPlantSelectCancel} /> :
                  <div className='row'>
                    {this.state.results.plants.map( (plant) => {
                      return <VisualSearchResult key={`search_result_${plant.id}`}
                                                 plant={plant}
                                                 onSelect={this.showPlantPreview} />
                    })}
                  </div>
                }

              </div>
            </div>
          }

          <a className='btn btn-default'
             href='javascript:void(0)'
             onClick={this.props.onSelect}>
             Back
          </a>
        </div>
      </div>
    )
  }
}

export default BasicTemplateSearch;
