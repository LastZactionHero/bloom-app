import MultiSelector from './MultiSelector';

class GrowthRateSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Growth Rate';
    this.optionsKey = 'growth_rates'
  }
}

export default GrowthRateSelector;