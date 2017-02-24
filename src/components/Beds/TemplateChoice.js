import React from 'react';
import BedActions from '../../actions/BedActions';
import BedStore from '../../stores/BedStore';

class TemplateChoice extends React.Component {
  constructor() {
    super();
    this.state = BedStore.getState();
  }

  componentDidMount = () => { BedStore.listen(this.onChange) }
  componentWillUnmount = () => { BedStore.unlisten(this.onChange) }
  onChange = (state) => {
    this.setState(state);
  }

  handleSelectTemplate = () => {
    BedActions.startSelectTemplate(this.props.bed, this.props.template)
  }

  render() {
    return(
      <div className='template-choice'>
        <div className='row'>
          <div className='col-md-6'>
            <h4>{this.props.template.name}</h4>
            <p>Some creative details about this template choice.</p>
          </div>
          <div className='col-md-4'>
            <p>Preview Image</p>
          </div>
          <div className='col-md-2'>
            <button className={`btn btn-primary ${this.state.selecting ? 'disabled' : null}`}
                    onClick={this.handleSelectTemplate}>Select</button>
          </div>
        </div>

      </div>
    )
  }
}

export default TemplateChoice;