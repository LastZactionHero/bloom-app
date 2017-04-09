import MultiSelector from './MultiSelector';

class LeaveTypeSelector extends MultiSelector {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Leave Types';
    this.optionsKey = 'leave_types'
  }
}

export default LeaveTypeSelector;