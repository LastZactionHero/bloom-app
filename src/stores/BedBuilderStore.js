import alt from '../alt';
import BedBuilderActions from '../actions/BedBuilderActions';

class BedBuilderStore {
  constructor() {
    this.bindListeners({
      handleNextStep: BedBuilderActions.NEXT_STEP,
      handleSelectStep: BedBuilderActions.SELECT_STEP,

      handleNameChange: BedBuilderActions.NAME_CHANGE,
      handleWidthChange: BedBuilderActions.WIDTH_CHANGE,
      handleDepthChange: BedBuilderActions.DEPTH_CHANGE
    });

    //   handleZipcodeChange: YardBuilderActions.ZIPCODE_CHANGE,
    //   handleZoneChange: YardBuilderActions.ZONE_CHANGE,
    //   handleZoneFetchFail: YardBuilderActions.ZONE_FETCH_FAIL,
    //   handleSoilChange: YardBuilderActions.SOIL_CHANGE,
    //   handleTogglePlantPreference: YardBuilderActions.TOGGLE_PLANT_PREFERENCE,
    //   handleStartCreateYard: YardBuilderActions.START_CREATE_YARD,
    //   handleCreatedYard: YardBuilderActions.CREATED_YARD,
    //   handleCreateYardFail: YardBuilderActions.CREATE_YARD_FAIL
    // });

    this.bed = {
      yard_id: null,
      name: '',
      attached_to_house: false,
      orientation: null,
      width: '',
      depth: '',
      sunlight_morning: '',
      sunlight_afternoon: '',
      soil: '',
      watered: false
    }
    this.errors = {}

    this.activeStep = 'dimensions';
    this.steps = {
      dimensions: {complete: false},
      position: {complete: false},
      sunlight: {complete: false},
      moisture: {complete: false}
    }
    this.allComplete = false;
    this.submitting = false;
  }

  handleNextStep() {
    switch(this.activeStep) {
      case 'dimensions':
        this.activeStep = 'position';
        break;
      case 'position':
        this.activeStep = 'sunlight';
        break;
      case 'sunlight':
        this.activeStep = 'moisture';
        break;
    }
  }

  handleSelectStep(stepName) {
    if(this.steps[stepName].complete) {
      this.activeStep = stepName;
    }
  }

  handleNameChange(name) {
    this.bed.name = name;
    this.checkStepCompletion();
  }

  handleWidthChange(widthStr) {
    this.errors.width = null;

    widthStr = widthStr.replace(/[^0-9]/g, ''); // Remove any non-numbers
    if(widthStr.length > 0) {
      let width = parseInt(widthStr);
      if(width <= 999) {
        this.bed.width = width;
        if(width > 99) {
          this.errors.width = 'Must be under 100\' wide';
        } else if(width < 3) {
          this.errors.width = 'Must be over 3\' wide';
        }
      } else {
        this.errors.width = 'Must be under 100\' wide';
      }
    } else {
      this.bed.width = ''
    }
    this.checkStepCompletion();
  }

  handleDepthChange(depthStr) {
    this.errors.depth = null;

    depthStr = depthStr.replace(/[^0-9]/g, ''); // Remove any non-numbers
    if(depthStr.length > 0) {
      let depth = parseInt(depthStr);
      if(depth <= 999) {
        this.bed.depth = depth;
        if(depth > 99) {
          this.errors.depth = 'Must be under 100\' wide';
        } else if(depth < 3) {
          this.errors.depth = 'Must be over 3\' wide';
        }
      } else {
        this.errors.depth = 'Must be under 100\' wide';
      }
    } else {
      this.bed.depth = ''
    }
    this.checkStepCompletion();
  }

  checkStepCompletion() {
    this.steps.dimensions.complete =
      this.bed.name.length > 0
      && this.bed.width && this.bed.width >= 3 && this.bed.width <= 99
      && this.bed.depth && this.bed.depth >= 3 && this.bed.depth <= 99
    // this.steps.location.complete = (this.yard.zone && this.yard.zone != 'invalid');
    // this.steps.soil.complete = (this.yard.soil.length > 0);
    // // preferred_plant_types is set complete as soon as it's viewed
    // 
    // this.allComplete = (
    //   this.steps.location.complete
    //   && this.steps.soil.complete
    //   && this.steps.plant_preferences.complete
    // );
  }

  // handleStartCreateYard() {
  //   this.submitting = true;
  // }
  // 
  // handleCreatedYard(yard) {
  //   // TODO: Something
  // }
  // 
  // handleCreateYardFail(xhr) {
  //   // TODO: Something
  //   this.submitting = false;
  // }
}

export default alt.createStore(BedBuilderStore, 'BedBuilderStore');
