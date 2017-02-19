import alt from '../alt';
import ZoneSource from '../sources/ZoneSource';

class YardBuilderActions {
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
}

export default alt.createActions(YardBuilderActions);
