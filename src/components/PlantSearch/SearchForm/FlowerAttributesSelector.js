import MultiSelector from './MultiSelector';

class FlowerAttributesSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Flower Attributes';
    this.optionsKey = 'flower_attributes'
  }
}

export default FlowerAttributesSelector;