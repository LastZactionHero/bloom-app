import MultiSelector from './MultiSelector';

class GardenStylesSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Garden Styles';
    this.optionsKey = 'garden_styles'
  }
}

export default GardenStylesSelector;