import React from 'react';
import AdvancedSearchStore from 'stores/AdvancedSearchStore';
import SearchForm from './SearchForm';
import VisualSearchResult from './VisualSearchResult';
import Modal from 'components/Common/Modal';
import PlantPreview from './PlantPreview';
import Pagination from 'components/Common/Pagination';
import AdvancedSearchActions from 'actions/AdvancedSearchActions';

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = AdvancedSearchStore.getState();
  }

  componentDidMount = () => {
    AdvancedSearchStore.listen(this.onChange);
    setTimeout( () => {
      AdvancedSearchActions.updatePage(0);
    })
  }

  componentWillUnmount = () => {
    AdvancedSearchStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state)
  }

  showPlantPreview = (plant) => {
    this.setState({plantPreview: plant});
  }

  onPlantSelectCancel = () => {
    this.setState({plantPreview: null});
  }

  onChangePage = (pageIdx) => {
    AdvancedSearchActions.updatePage(pageIdx);
  }

  render() {
    return(
      <div>
        <h2>Plant Search</h2>
        <div className='row'>
          <div className='col-sm-3'>
            <SearchForm />
          </div>
          <div className='col-sm-9'>
            <div className='row'>
              {this.state.results.plants.map( (plant) => {
                return <VisualSearchResult key={`search_result_${plant.id}`}
                                           plant={plant}
                                           onSelect={this.showPlantPreview} />
              })}
            </div>

            {this.state.results ?
              <Pagination current={this.state.results.meta.page_idx}
                          total={this.state.results.meta.total_pages}
                          onChangePage={this.onChangePage} />
              : null
            }

            {this.state.results.plants.length == 0 ?
              <div className='alert alert-warning'>No Results</div>
              : null
            }
          </div>
        </div>

        {this.state.plantPreview ?
          <Modal title={this.state.plantPreview.common_name}
                 buttons={[
                   {name: 'Close', onClick: () => {this.onPlantSelectCancel()}}
                 ]}>
            <PlantPreview plant={this.state.plantPreview} />
          </Modal>
          : null
        }
      </div>
    );
  }
}

export default AdvancedSearch;
