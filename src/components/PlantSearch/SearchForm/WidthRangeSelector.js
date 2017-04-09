import NumericRangeSelector from './NumericRangeSelector';

class WidthRangeSelector extends NumericRangeSelector {
  constructor(props) {
    super(props);
    this.dimension = 'width';
    this.dimensionName = 'Width';
  }
}

export default WidthRangeSelector;