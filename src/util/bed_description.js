import StringUtil from './string';

export default {
  sunlight(bed) {
    if(bed.sunlight_morning && bed.sunlight_afternoon) {
      return 'All day sunlight'
    } else if(bed.sunlight_morning && !bed.sunlight_afternoon) {
      return 'Morning sun, afternoon shade'
    } else if(!bed.sunlight_morning && bed.sunlight_afternoon) {
      return 'Morning shade, afternoon sun'
    } else {
      return 'All day shade';
    }
  },

  orientation(bed) {
    let string = `${StringUtil.capitalize(bed.orientation)}-facing`;
    if(bed.attached_to_house) {
      string += ', attached to house'
    }
    return string;
  }
}