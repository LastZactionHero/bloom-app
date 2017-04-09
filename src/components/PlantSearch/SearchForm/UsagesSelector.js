import MultiSelector from './MultiSelector';

class UsagesSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Usages';
    this.optionsKey = 'usages'
  }
}

export default UsagesSelector;