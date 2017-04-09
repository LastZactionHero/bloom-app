import React from 'react';
import AdvancedSearchStore from 'stores/AdvancedSearchStore';
import ZoneSource from 'sources/ZoneSource';
import AdvancedSearchActions from 'actions/AdvancedSearchActions';

class ZonesSelector extends React.Component {
  constructor(props) {
    super(props);
    this.fieldLabel = 'Zones';
    this.optionsKey = 'zones'
    this.state = AdvancedSearchStore.getState();
    this.state.zipcode = '';
    this.state.zoneError = false;
  }

  componentDidMount = () => {
    AdvancedSearchStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    AdvancedSearchStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state)
  }

  onZipcodeChange = (event) => {
    this.setState({zoneError: false});

    const zipcode = event.target.value;

    if(zipcode.match(/[^0-9]/)) { return; }
    if(zipcode.length > 5){ return; }

    this.setState({zipcode: event.target.value});

    if(zipcode.length == 5) {
      ZoneSource.findZone(zipcode)
        .then( (zone) => {
          AdvancedSearchActions.updateQuery('zones', this.state.options.zones.find( (z) => { return z.name == zone } ))
        })
        .catch( (xhr) => { this.setState({zoneError: true}) } );
    } else {
      AdvancedSearchActions.clearQuery('zones');
    }
  }

  render() {
    return(
      <div>
        <div className='form-group'>
          <label>Zipcode</label>
          <input type='text' className='form-control' value={this.state.zipcode} onChange={this.onZipcodeChange} />
          {this.state.query.zones.length > 0 ?
            <div className='label label-success'><strong>Zone: {this.state.query.zones[0]}</strong></div>
            : <span className='help-block'>Find only plants in your area</span>
          }
          {
            this.state.zoneError ?
              <div className='field-error'>
                Hmm, this doesn&apos;t look like a valid zipcode.
              </div> : null
          }
        </div>
      </div>
    )
  }
}

export default ZonesSelector;
