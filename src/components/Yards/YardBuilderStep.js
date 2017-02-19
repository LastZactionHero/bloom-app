import React from 'react';
import YardBuilderStore from '../../stores/YardBuilderStore';
import YardBuilderActions from '../../actions/YardBuilderActions';

class YardBuilderStep extends React.Component {
  constructor() {
    super();
    this.state = YardBuilderStore.getState();
  }

  componentDidMount = () => {
    YardBuilderStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    YardBuilderStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state)
  }

  nextStep = () => {
    YardBuilderActions.nextStep();
  }

  selectStep = (stepName) => {
    YardBuilderActions.selectStep(stepName);
  }

  stepStateClass = () => {
    if(this.props.active){
      return 'active';
    } else if(this.props.incomplete) {
      return 'incomplete';
    }
    return null;
  }
}

export default YardBuilderStep;
