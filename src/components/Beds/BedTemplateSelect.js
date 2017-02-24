import React from 'react'
import BedStore from '../../stores/BedStore';
import BedActions from '../../actions/BedActions';
import Loading from '../Common/Loading';
import ErrorAlert from '../Common/ErrorAlert';
import TemplateChoice from './TemplateChoice';

class BedTemplateSelect extends React.Component {

  constructor() {
    super();
    this.state = BedStore.getState();
  }

  componentDidMount = () => {
    BedStore.listen(this.onChange);

    setTimeout( () => {
      BedActions.init(this.props.bed);
      BedActions.startFetchSuggestTemplates(this.props.bed);
    });
  }

  componentWillUnmount = () => {
    BedStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  render() {
    if(this.state.bed == null) return(<div />); // Initing state

    return (
      <div className='bed-template-select panel panel-default'>
        <div className='panel-heading'>
          <h3>Select a style for <em>{this.state.bed.name}</em></h3>
        </div>
        <div className='panel-body'>
          {this.state.error ? <ErrorAlert error={this.state.error} /> : null}
          { this.state.loading ?
              <Loading message='Loading style suggestions' /> :
                this.state.suggestedTemplates.length > 0 ?
                  <div>
                    <h4>Here are some styles that would work for this garden bed. Pick one that you prefer:</h4>
                    {this.state.suggestedTemplates.map( (template) => {
                      return <TemplateChoice key={`suggested_template_choice_${template.id}`}
                                             template={template}
                                             bed={this.state.bed} />
                    })}
                  </div>
                  : <div />
          }
        </div>
      </div>
    )
  }
}

export default BedTemplateSelect;