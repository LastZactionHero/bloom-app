import MultiSelector from './MultiSelector';

class FlowerColorsSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Flower Colors';
    this.optionsKey = 'flower_colors'
  }
}

export default FlowerColorsSelector;