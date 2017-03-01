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
    setTimeout( () => { TemplateActions.fetchPlacements(this.props.bed); })
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
        {this.state.loading.placements ?
          <Loading message='Rendering bed' /> :
          <div>
            {this.state.placements ? <TemplateRenderCanvas placements={this.state.placements} placementWidth={this.props.bed.width * 12} placementHeight={this.props.bed.depth * 12}/> : null}
          </div>
        }

      </div>
    )
  }
}

export default TemplateViewer;
