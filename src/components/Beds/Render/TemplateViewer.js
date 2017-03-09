import React from 'react'
import TemplateRenderCanvas from './TemplateRenderCanvas';
import TemplateActions from 'actions/TemplateActions';
import YardsStore from 'stores/YardsStore';
import Loading from 'components/Common/Loading';

class TemplateViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = YardsStore.getState();
  }

  componentDidMount = () => {
    YardsStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    YardsStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  render() {
    return(
      <div>
        {this.state.loading.template_placements ?
          <Loading message='Rendering bed' /> :
          <div>
            {this.props.bed.template_placements ?
              <TemplateRenderCanvas placements={this.props.bed.template_placements}
                                    placementWidth={this.props.bed.width * 12}
                                    placementHeight={this.props.bed.depth * 12}
                                    renderWidth={this.props.renderWidth}
                                    renderHeight={this.props.renderHeight}
                                    renderFontSizeLabel={this.props.renderFontSizeLabel}
                                    legend={this.props.legend}/>
              : null}
          </div>
        }
      </div>
    )
  }
}

export default TemplateViewer;
