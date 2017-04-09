import React from 'react';
import AdvancedSearchStore from 'stores/AdvancedSearchStore';
import AdvancedSearchActions from 'actions/AdvancedSearchActions';

class NumericRangeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = AdvancedSearchStore.getState();
  }

  componentDidMount = () => {
    AdvancedSearchStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    AdvancedSearchStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  handleMinChange(event) {
    AdvancedSearchActions.updateQuery(`${this.dimension}_min`, event.target.value);
  }

  handleMaxChange(event) {
    AdvancedSearchActions.updateQuery(`${this.dimension}_max`, event.target.value);
  }

  render() {
    return(
      <div className='form-group'>
        <label>{this.dimensionName} (inches)</label>
        <div>
          <input
            type='text'
            className='form-control dimension-range'
            onChange={this.handleMinChange.bind(this)}
            placeholder='0'
            value={this.state.query[this.dimension].min || ''} />
          &nbsp;to&nbsp;
          <input
            type='text'
            className='form-control dimension-range'
            onChange={this.handleMaxChange.bind(this)}
            placeholder='∞'
            value={this.state.query[this.dimension].max || ''} />
          </div>
      </div>
    );
  }
}

export default NumericRangeSelector;
