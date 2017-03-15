import alt from '../alt';
import YardBuilderActions from '../actions/YardBuilderActions';
import YardsActions from '../actions/YardsActions';
import { browserHistory } from 'react-router'

class YardBuilderStore {
  constructor() {
    this.bindListeners({
      reset: YardBuilderActions.RESET,

      handleNextStep: YardBuilderActions.NEXT_STEP,
      handleSelectStep: YardBuilderActions.SELECT_STEP,
      handleZipcodeChange: YardBuilderActions.ZIPCODE_CHANGE,
      handleZoneChange: YardBuilderActions.ZONE_CHANGE,
      handleZoneFetchFail: YardBuilderActions.ZONE_FETCH_FAIL,
      handleSoilChange: YardBuilderActions.SOIL_CHANGE,
      handleTogglePlantPreference: YardBuilderActions.TOGGLE_PLANT_PREFERENCE
    });

    this.reset();
  }

  reset() {
    this.yard = {
      zipcode: '',
      zone: '',
      soil: '',
      preferred_plant_types: []
    }
    this.activeStep = 'location';
    this.steps = {
      location: {complete: false},
      soil: {complete: false},
      plant_preferences: {complete: false}
    }
    this.allComplete = false;
    this.submitting = false;
  }

  handleNextStep() {
    switch(this.activeStep) {
      case 'location':
        this.activeStep = 'soil';
        break;
      case 'soil':
        this.activeStep = 'plant_preferences';
        this.steps.plant_preferences.complete = true; // Step is complete as soon as it's viewed
        this.checkStepCompletion();
        break;
    }
  }

  handleSelectStep(stepName) {
    if(this.steps[stepName].complete) {
      this.activeStep = stepName;
    }
  }

  handleSoilChange(soil) {
    this.yard.soil = soil;
    this.checkStepCompletion();
  }

  handleZipcodeChange(zipcode) {
    if(zipcode.length <= 5 && zipcode.match(/[^0-9]/) == null) {
      this.yard.zipcode = zipcode;

      // We have a complete zipcode- fetch the zone
      if(this.yard.zipcode.length == 5) {
        setTimeout(() => {YardBuilderActions.fetchZone(zipcode)})
      } else if(this.yard.zipcode.length < 5) {
        this.yard.zone = null;
      }
    }
    this.checkStepCompletion();
  }

  handleZoneChange(zone) {
    this.yard.zone = zone;
    this.checkStepCompletion();
  }

  handleZoneFetchFail() {
    this.yard.zone = 'invalid';
    this.checkStepCompletion();
  }

  checkStepCompletion() {
    this.steps.location.complete = (this.yard.zone && this.yard.zone != 'invalid');
    this.steps.soil.complete = (this.yard.soil.length > 0);
    // preferred_plant_types is set complete as soon as it's viewed

    this.allComplete = (
      this.steps.location.complete
      && this.steps.soil.complete
      && this.steps.plant_preferences.complete
    );
  }

  handleTogglePlantPreference(plantType) {
        const plantTypeIdx = this.yard.preferred_plant_types.indexOf(plantType);
      if(plantTypeIdx == -1) {
        this.yard.preferred_plant_types.push(plantType);
      } else {
        this.yard.preferred_plant_types.splice(plantTypeIdx, 1);
      }
  }

}

export default alt.createStore(YardBuilderStore, 'YardBuilderStore');
