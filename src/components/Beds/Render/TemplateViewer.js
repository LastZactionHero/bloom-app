import React from 'react'
import TemplateSource from '../../../sources/TemplateSource';
import TemplateRenderCanvas from './TemplateRenderCanvas';

class TemplateViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {placements: null}
  }

  componentDidMount = () => {
    this.startDraw();
  }

  startDraw = () => {
    TemplateSource.fetchPlacements(
      this.props.bed.template_id,
      this.props.bed.width * 12,
      this.props.bed.depth * 12
    ).then( (response) => {
      console.log(response);
      this.setState({placements: response.placements});
    }).catch( (xhr) => {
      console.log(xhr)
    });
  }

  render() {
    return(
      <div>
        <div>Render Canvas {this.state.placements ? this.state.placements.length : null}</div>
        <div>
          {this.state.placements ? <TemplateRenderCanvas placements={this.state.placements} placementWidth={this.props.bed.width * 12} placementHeight={this.props.bed.depth * 12}/> : null}
        </div>
      </div>
    )
  }
}

export default TemplateViewer;
