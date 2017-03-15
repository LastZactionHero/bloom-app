import alt from '../alt';
import ZoneSource from '../sources/ZoneSource';
import YardSource from '../sources/YardSource';

class YardBuilderActions {
  reset() {
    return null;
  }

  zipcodeChange(zipcode) {
    return zipcode;
  }

  zoneChange(zone) {
    return zone;
  }

  zoneFetchFail() {
    return null;
  }

  fetchZone(zipcode) {
    ZoneSource.findZone(zipcode)
      .then( (zone) => { this.zoneChange(zone) })
      .catch( (xhr) => { this.zoneFetchFail() });
  }

  soilChange(soil) {
    return soil;
  }

  nextStep() {
    return null;
  }

  selectStep(stepName) {
    return stepName;
  }

  togglePlantPreference(plantType) {
    return plantType;
  }

  startCreateYard(yard) {
    YardSource.create(yard)
      .then( (response) => { this.createdYard(response) } )
      .catch( (xhr) => { this.createYardFail(xhr) })
    return null;
  }

  createdYard(yard) {
    return yard;
  }

  createYardFail(xhr) {
    return xhr.responseJSON || {};
  }
}

export default alt.createActions(YardBuilderActions);
