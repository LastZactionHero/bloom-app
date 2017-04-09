import MultiSelector from './MultiSelector';

class SpecialFeaturesSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Special Features';
    this.optionsKey = 'special_features'
  }
}

export default SpecialFeaturesSelector;