import MultiSelector from './MultiSelector';

class LightNeedsSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Light Needs';
    this.optionsKey = 'light_needs'
  }
}

export default LightNeedsSelector;