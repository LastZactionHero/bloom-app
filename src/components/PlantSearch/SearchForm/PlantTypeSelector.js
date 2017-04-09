import MultiSelector from './MultiSelector';

class ZonesSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Plant Types';
    this.optionsKey = 'plant_types'
  }
}

export default ZonesSelector;