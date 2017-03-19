import alt from '../alt';
import BedBuilderActions from '../actions/BedBuilderActions';

class BedBuilderStore {
  constructor() {
    this.bindListeners({
      reset: BedBuilderActions.RESET,

      handleYardChange: BedBuilderActions.YARD_CHANGE,
      handleNextStep: BedBuilderActions.NEXT_STEP,
      handleSelectStep: BedBuilderActions.SELECT_STEP,

      handleNameChange: BedBuilderActions.NAME_CHANGE,
      handleWidthChange: BedBuilderActions.WIDTH_CHANGE,
      handleDepthChange: BedBuilderActions.DEPTH_CHANGE,

      handleSoilChange: BedBuilderActions.SOIL_CHANGE,
      handleWateredChange: BedBuilderActions.WATERED_CHANGE,

      handleAttachedToHouseChange: BedBuilderActions.ATTACHED_TO_HOUSE_CHANGE,
      handleOrientationChange: BedBuilderActions.ORIENTATION_CHANGE,

      handleSunlightMorningChange: BedBuilderActions.SUNLIGHT_MORNING_CHANGE,
      handleSunlightAfternoonChange: BedBuilderActions.SUNLIGHT_AFTERNOON_CHANGE,

      handleStartCreateBed: BedBuilderActions.START_CREATE_BED,
      handleCreateBedFail: BedBuilderActions.CREATE_BED_FAIL
    });

    this.reset();
  }

  reset() {
    this.bed = {
      yard_id: null,
      name: '',
      attached_to_house: null,
      orientation: '',
      width: '',
      depth: '',
      sunlight_morning: null,
      sunlight_afternoon: null,
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

  handleYardChange(yard) {
    this.bed.yard_id = yard.id;
    this.bed.yard = yard;

    // Assume the soil is the same as the yard
    this.bed.soil = yard.soil;
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

  handleWateredChange(watered) {
    this.bed.watered = watered;
  }

  handleSoilChange(soil) {
    this.bed.soil = soil;
    this.checkStepCompletion();
  }

  handleAttachedToHouseChange(attached) {
    this.bed.attached_to_house = attached;
    this.checkStepCompletion();
  }

  handleOrientationChange(orientation) {
    this.bed.orientation = orientation;

    // Infer the bed sunlight by orientation
    if(this.bed.sunlight_morning == null && this.bed.sunlight_afternoon == null){
      switch(orientation){
        case 'north':
          this.bed.sunlight_morning = false;
          this.bed.sunlight_afternoon = false;
          break;
        case 'south':
          this.bed.sunlight_morning = true;
          this.bed.sunlight_afternoon = true;
          break;
        case 'east':
          this.bed.sunlight_morning = true;
          this.bed.sunlight_afternoon = false;
          break;
        case 'west':
          this.bed.sunlight_morning = false;
          this.bed.sunlight_afternoon = true;
          break;
      }
    }

    this.checkStepCompletion();
  }

  handleSunlightMorningChange(sunlight) {
    this.bed.sunlight_morning = sunlight;
    this.checkStepCompletion();
  }

  handleSunlightAfternoonChange(sunlight) {
    this.bed.sunlight_afternoon = sunlight;
    this.checkStepCompletion();
  }

  checkStepCompletion() {
    this.steps.dimensions.complete =
      this.bed.name.length > 0
      && this.bed.width && this.bed.width >= 3 && this.bed.width <= 99
      && this.bed.depth && this.bed.depth >= 3 && this.bed.depth <= 99;

    this.steps.position.complete =
      this.bed.attached_to_house != null &&
      this.bed.orientation.length > 0;

    this.steps.sunlight.complete =
      this.bed.sunlight_morning != null &&
      this.bed.sunlight_afternoon != null &&
      this.steps.position.complete

    this.steps.moisture.complete = this.bed.soil.length > 0 && this.steps.sunlight.complete;

    this.allComplete = (
      this.steps.dimensions.complete
      && this.steps.position.complete
      && this.steps.sunlight.complete
      && this.steps.moisture.complete
    );
  }

  handleStartCreateBed() {
    this.submitting = true;
  }

  handleCreateBedFail(xhr) {
    // TODO: Something
    this.submitting = false;
  }
}

export default alt.createStore(BedBuilderStore, 'BedBuilderStore');
