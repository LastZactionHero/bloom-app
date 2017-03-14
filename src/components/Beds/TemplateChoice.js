import React from 'react';
import TemplateSource from 'sources/TemplateSource';
import YardsStore from 'stores/YardsStore';
import BedActions from '../../actions/BedActions';
import Loading from 'components/Common/Loading';
import TemplateViewer from './Render/TemplateViewer';

class TemplateChoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = YardsStore.getState();
    this.state.loading = true;
    this.state.error = false;
    this.state.mockBed = {
      width: props.bed.width,
      depth: props.bed.depth,
      template_placements: []
    };
  }

  componentDidMount = () => {
    YardsStore.listen(this.onChange)

    TemplateSource.fetchPlacements(
      this.props.template.id,
      this.props.bed.width * 12,
      this.props.bed.depth * 12
    ).then( (response) => {
      let mockBed = this.state.mockBed;
      mockBed.template_placements = response.placements;
      this.setState({mockBed: mockBed, loading: false});
    }).catch( (xhr) => {
      this.setState({loading: false, error: true});
    });
  }

  componentWillUnmount = () => {
    YardsStore.unlisten(this.onChange)
  }

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
            {this.state.loading ?
              <Loading message=' ' />
              :
              this.state.error ?
                'Preview unavailable' :
                <TemplateViewer bed={this.state.mockBed} renderFontSizeLabel={8} />
            }
          </div>
          <div className='col-md-2'>
            <button className={`btn btn-primary ${this.state.loading.selectTemplate ? 'disabled' : null}`}
                    onClick={this.handleSelectTemplate}>Select</button>
          </div>
        </div>

      </div>
    )
  }
}

export default TemplateChoice;
