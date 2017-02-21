import alt from '../alt';

class BedBuilderActions {
  nextStep() {
    return null;
  }

  selectStep(stepName) {
    return stepName;
  }

  nameChange(name) {
    return name;
  }

  widthChange(width) {
    return width;
  }

  depthChange(depth) {
    return depth;
  }

  // startCreateYard(yard) {
  //   YardSource.create(yard)
  //     .then( (response) => { this.createdYard(response) } )
  //     .catch( (xhr) => { this.createYardFail(xhr) })
  //   return null;
  // }
  // 
  // createdYard(yard) {
  //   return yard;
  // }
  // 
  // createYardFail(xhr) {
  //   return xhr;
  // }
}

export default alt.createActions(BedBuilderActions);
