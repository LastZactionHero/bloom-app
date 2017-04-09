import React from 'react';
import AdvancedSearchStore from 'stores/AdvancedSearchStore';
import AdvancedSearchActions from 'actions/AdvancedSearchActions';

class MultiSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = AdvancedSearchStore.getState();
    this.state.expanded = false;
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

  handleSelect = (option) => {
    AdvancedSearchActions.updateQuery(this.optionsKey, option)
  }

  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  }

  activeFilters = () => {
    let filterIds = this.state.query[this.optionsKey];
    return filterIds.map((id) => { return this.state.options[this.optionsKey].find((item) => {return item.id == id}).name });
  }

  clearFilter = () => {
    AdvancedSearchActions.clearQuery(this.optionsKey);
  }

  render() {
    return(
      <div className='form-group'>
        <div onClick={this.toggleExpand}>
          <div>
            <a href='javascript:void(0)'>
              {this.state.expanded ? '-' : '+'}
            </a>
            &nbsp;
            <label>{this.fieldLabel}</label>
          </div>
        </div>
        {this.state.expanded ?
          <div className='btn-group-vertical clearfix' role='group'>
            {this.state.options[this.optionsKey] ? this.state.options[this.optionsKey].map(
              (option) => {
                return <button
                    type="button"
                    key={this.optionsKey + '_' + option.id}
                    className={(this.state.query[this.optionsKey].indexOf(option.id) == -1) ? 'btn btn-default' : 'btn btn-success'}
                    onClick={() => {this.handleSelect(option)}}>
                  {option.name}
                </button>
              }) : <div></div>
            }
          </div> : <div>
            {this.activeFilters().map((filterName) => {return <span key={this.optionsKey + '_' + filterName}><span className='label label-success'>{filterName}</span>&nbsp;</span>})}
            {this.activeFilters().length > 0 ? <a href='javascript:void(0)' onClick={this.clearFilter}>clear</a> : null}
          </div>
        }
      </div>
    )
  }
}

export default MultiSelector;
