import React from 'react'
import YardsStore from '../../stores/YardsStore';
import BedActions from '../../actions/BedActions';
import Loading from '../Common/Loading';
import ErrorAlert from '../Common/ErrorAlert';
import TemplateChoice from './TemplateChoice';
import { Link } from 'react-router'

class BedTemplateSelect extends React.Component {

  constructor() {
    super();
    this.state = YardsStore.getState();
  }

  componentDidMount = () => {
    YardsStore.listen(this.onChange);

    setTimeout( () => {
      BedActions.startFetchSuggestTemplates(this.props.bed);
    });
  }

  componentWillUnmount = () => {
    YardsStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  render() {
    if(this.props.bed == null) return(<div />); // Initing state

    return (
      <div className='bed-template-select panel panel-default'>
        <div className='panel-heading'>
          <h3>Select a style for <em>{this.props.bed.name}</em></h3>
        </div>
        <div className='panel-body'>
          {this.state.error ? <ErrorAlert error={this.state.error} /> : null}
          { this.state.loading.suggestedTemplates ?
              <Loading message='Loading style suggestions' /> :
                this.state.suggestedTemplates.length > 0 ?
                  <div>
                    <h4>Here are some styles that would look good for garden bed of this size ({this.props.bed.width}ft x {this.props.bed.depth}ft). Pick one that you prefer:</h4>

                    <div className='step-hint'>
                      A template is a guide for the organization of your plants.
                      Some are simple and neat, others are complex and natural.
                      Pick one below that you think suits this garden bed.
                      Don't worry if you make a mistake- you can always change this later.
                    </div>

                    {this.props.bed.template_id ?
                      <div className='alert alert-danger alert-inverted'>
                        You have already selected a template for this bed. If you select a different template, it will remove any plant selections for this bed.
                        <br/>
                        <Link className='' to={{pathname: `/dashboard/yards/${this.props.yard.id}`}}>Cancel</Link>
                      </div> : null}

                    <div className='row'>
                    {this.state.suggestedTemplates.map( (template) => {
                      return <div className='col-md-4'>
                      <TemplateChoice key={`suggested_template_choice_${template.id}`}
                                             template={template}
                                             bed={this.props.bed} />
                      </div>
                    })}
                    </div>
                  </div>
                  : <div />
          }
        </div>
      </div>
    )
  }
}

export default BedTemplateSelect;
