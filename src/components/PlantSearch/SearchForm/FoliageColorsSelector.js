import MultiSelector from './MultiSelector';

class FoliageColorsSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Foliage Colors';
    this.optionsKey = 'foliage_colors'
  }
}

export default FoliageColorsSelector;