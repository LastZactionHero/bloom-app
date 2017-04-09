import MultiSelector from './MultiSelector';

class KeyFeaturesSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Key Features';
    this.optionsKey = 'key_features'
  }
}

export default KeyFeaturesSelector;