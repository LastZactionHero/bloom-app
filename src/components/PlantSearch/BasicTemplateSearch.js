import React from 'react'
import PlantSearchActions from 'actions/PlantSearchActions';
import PlantSearchStore from 'stores/PlantSearchStore';
import StingUtil from '../../util/string'
import Loading from 'components/Common/Loading';
import VisualSearchResult from './VisualSearchResult';
import PlantPreview from './PlantPreview';
import Pagination from 'components/Common/Pagination';
import Modal from 'components/Common/Modal';

class BasicTemplateSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlantSearchStore.getState();
    this.state.plantPreview = null;
  }

  componentDidMount = () => {
    PlantSearchStore.listen(this.onChange);

    PlantSearchActions.setupQueryAndFetch(
      this.props.templatePlant.search_query,
      this.props.bed,
      this.props.yard);
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

  onChangePage = (pageIdx) => {
    PlantSearchActions.updatePage(pageIdx);
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

                <div>
                  <div className='row'>
                    {this.state.results.plants.map( (plant) => {
                      return <VisualSearchResult key={`search_result_${plant.id}`}
                                                 plant={plant}
                                                 onSelect={this.showPlantPreview} />
                    })}
                  </div>
                  <div>Page {this.state.results.meta.page_idx + 1} of {this.state.results.meta.total_pages}</div>
                  <div>{StingUtil.pluralize(this.state.results.meta.total, 'plant', 'plants')}</div>

                  {this.state.results ?
                    <Pagination current={this.state.results.meta.page_idx}
                                total={this.state.results.meta.total_pages}
                                onChangePage={this.onChangePage} />
                    : null
                  }

                </div>

              </div>

              {this.state.plantPreview ?
                <Modal title={this.state.plantPreview.common_name}
                       buttons={[
                         {name: 'Cancel', onClick: () => {this.onPlantSelectCancel()}}  ,
                         {name: 'Select Plant', class: 'btn-success', onClick: () => {this.onPlantSelectConfirm(this.state.plantPreview)}}
                       ]}>
                  <PlantPreview plant={this.state.plantPreview} />
                </Modal>
                : null
              }

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
