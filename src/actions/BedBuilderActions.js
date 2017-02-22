import alt from '../alt';
import BedSource from '../sources/BedSource';

class BedBuilderActions {
  nextStep() {
    return null;
  }

  selectStep(stepName) {
    return stepName;
  }

  yardIdChange(yardID) {
    return yardID
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

  soilChange(soil) {
    return soil;
  }

  wateredChange(watered) {
    return watered;
  }

  attachedToHouseChange(attached) {
    return attached;
  }

  orientationChange(orientation) {
    return orientation;
  }

  sunlightMorningChange(sunlight) {
    return sunlight;
  }

  sunlightAfternoonChange(sunlight) {
    return sunlight;
  }

  startCreateBed(bed) {
    BedSource.create(bed)
      .then( (response) => {this.createBed(bed)} )
      .catch( (xhr) => {this.createBedFail(xhr)} )
    return null;
  }

  createdBed(bed) {
    return bed;
  }

  createBedFail(xhr) {
    return xhr;
  }
  // startCreateYard(yard) {
  //   YardSource.create(yard)
  //     .then( (response) => { this.createdYard(response) } )
  //     .catch( (xhr) => { this.createYardFail(xhr) })
  //   return null;
  //
}

export default alt.createActions(BedBuilderActions);
