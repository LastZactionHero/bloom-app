import React from 'react'
import PlantSearchActions from 'actions/PlantSearchActions';
import PlantSearchStore from 'stores/PlantSearchStore';
import YardsStore from 'stores/YardsStore';
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

  onCommonNameChange = (event) => {
    PlantSearchActions.changeCommonName(event.target.value);
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
    const shoppingList = YardsStore.shoppingList(this.props.yard)
    return(
      <div className='plant-search'>
        <div className='basic-template-search'>
          <h3>Pick a Plant</h3>
          <div className='step-hint'>
            We&apos;ve narrowed down our database of plants to some specific choices we think would look good here.
            This includes the detals you provided about your yard and bed (sunlight, moisture, location, etc.)
            {shoppingList.length > 0 ?
              <div><br/>
                Other plants in your yard- they&apos;ll appear first in the list below if they&apos;re a good fit for this selection:
                <div className='row'>
                  <div className='col-md-12'>
                    {shoppingList.map((shoppingListItem) => {
                      return <div className='plant-image-background'
                                  key={`other_plants_${shoppingListItem.plant.permalink}`}
                                  style={{backgroundImage: `url("${shoppingListItem.plant.image_url}")`}} />
                    })}
                  </div>
                </div>
              </div> : null
            }
          </div>

          <div className='form-group form-group-lg hidden '>
            <input type='text'
                   className='form-control'
                   placeholder='Search these plants'
                   onChange={this.onCommonNameChange}
                   value={this.state.query.common_name} />
          </div>

          <hr/>

          {this.state.loading.results ?
            <Loading message='Searching' /> :
            <div>
              <h3 className='query-highlight'>{this.props.templatePlant.tooltip}</h3>
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
