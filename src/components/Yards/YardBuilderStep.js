import React from 'react';
import YardBuilderStore from '../../stores/YardBuilderStore';
import YardBuilderActions from '../../actions/YardBuilderActions';
import ReactScroll from 'react-scroll';


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
    ReactScroll.animateScroll.scrollToTop({duration: 250});
  }

  selectStep = (stepName) => {
    YardBuilderActions.selectStep(stepName);
    ReactScroll.animateScroll.scrollToTop({duration: 250});
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
