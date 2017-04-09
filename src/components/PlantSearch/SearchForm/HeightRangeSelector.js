import NumericRangeSelector from './NumericRangeSelector';

class HeightRangeSelector extends NumericRangeSelector {
  constructor(props) {
    super(props);
    this.dimension = 'height';
    this.dimensionName = 'Height';
  }
}

export default HeightRangeSelector;