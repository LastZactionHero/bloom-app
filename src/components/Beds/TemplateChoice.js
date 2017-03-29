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
    console.log("Template:")
    console.log(this.props.template)
    return(
      <div className='template-choice'>
        {this.state.loading ?
          <Loading message=' ' />
          :
          this.state.error ?
            'Preview unavailable' :
            <TemplateViewer bed={this.state.mockBed} renderFontSizeLabel={8} />
        }
        <ul>
          {this.props.template.template_plants.map( (templatePlant) => {
            return <li>
              <strong>{templatePlant.label} - {templatePlant.plant_type}:</strong> {templatePlant.tooltip}
            </li>
          })}
        </ul>
        <button className={`btn btn-primary ${this.state.loading.selectTemplate ? 'disabled' : null}`}
                onClick={this.handleSelectTemplate}>Select Template</button>

      </div>
    )
  }
}

export default TemplateChoice;
