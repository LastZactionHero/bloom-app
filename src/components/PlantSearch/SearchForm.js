import React from 'react';
import SearchStore from 'stores/AdvancedSearchStore';
import SearchActions from 'actions/AdvancedSearchActions';

import LeaveTypeSelector  from './SearchForm/LeaveTypeSelector';
import GrowthRateSelector from './SearchForm/GrowthRateSelector';
import FlowerColorsSelector from './SearchForm/FlowerColorsSelector';
import FoliageColorsSelector from './SearchForm/FoliageColorsSelector';
import LightNeedsSelector from './SearchForm/LightNeedsSelector';
import WateringNeedsSelector from './SearchForm/WateringNeedsSelector';
import KeyFeaturesSelector from './SearchForm/KeyFeaturesSelector';
import SpecialFeaturesSelector from './SearchForm/SpecialFeaturesSelector';
import ZonesSelector from './SearchForm/ZonesSelector';
import UsagesSelector from './SearchForm/UsagesSelector';
import GardenStylesSelector from './SearchForm/GardenStylesSelector';
import FlowerAttributesSelector from './SearchForm/FlowerAttributesSelector';
import PlantTypeSelector from './SearchForm/PlantTypeSelector';
import HeightRangeSelector from './SearchForm/HeightRangeSelector';
import WidthRangeSelector from './SearchForm/WidthRangeSelector';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = SearchStore.getState();
    setTimeout( () => { SearchActions.fetchOptions() } );
  }

  handleCommonNameChange(event) {
    let commonName = event.target.value;
    SearchActions.updateQuery('common_name', commonName);
  }

  render() {
    return(
      <div>
        <div className='well'>
          <h4>Location</h4>
          <hr/>
          <ZonesSelector />
        </div>

        <div className='well'>
          <h4>Plant Size</h4>
          <hr/>
          <HeightRangeSelector />
          <WidthRangeSelector />
        </div>

        <div className='well'>
          <h4>Other Features</h4>
          <hr/>
          <div className='form-group'>
            <label>Common Name</label>
            <input
              type='text'
              className='form-control'
              onChange={this.handleCommonNameChange.bind(this)}/>
          </div>
          <PlantTypeSelector />
          <UsagesSelector />
          <FoliageColorsSelector />
          <FlowerAttributesSelector />
          <FlowerColorsSelector />
          {/*<GardenStylesSelector />*/}
          {/*<GrowthRateSelector />*/}
          <KeyFeaturesSelector />
          <LeaveTypeSelector />
          <WateringNeedsSelector />
          <LightNeedsSelector />
          {/*<SpecialFeaturesSelector />*/}
        </div>
      </div>
    )
  }
}

export default SearchForm;
