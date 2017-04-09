import MultiSelector from './MultiSelector';

class WateringNeedsSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Watering Needs';
    this.optionsKey = 'watering_needs'
  }
}

export default WateringNeedsSelector;