import React from 'react';
import BedBuilderStore from '../../stores/BedBuilderStore';
import BedBuilderActions from '../../actions/BedBuilderActions';
import ReactScroll from 'react-scroll';


class BedBuilderStep extends React.Component {
  constructor() {
    super();
    this.state = BedBuilderStore.getState();
  }

  componentDidMount = () => {
    BedBuilderStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    BedBuilderStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state)
  }

  nextStep = () => {
    BedBuilderActions.nextStep();
    ReactScroll.animateScroll.scrollToTop({duration: 250});
  }

  selectStep = (stepName) => {
    BedBuilderActions.selectStep(stepName);
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

export default BedBuilderStep;
