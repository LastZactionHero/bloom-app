import String from './string';

export default {
  plantDescription(plant) {
    console.log(plant)
    let description = '';

    if(plant.leave_type) {
      description += ` ${plant.leave_type.name}`
    }

    if(plant.flower_attributes.length > 0) {
      description += ' flowering';
    }

    if(plant.plant_type && plant.plant_type.name){
      description += ` ${plant.plant_type.name}`
    } else {
      description += ' plant'
    }

    if(plant.size.avg_width){
      description += ` about ${plant.size.avg_width}\" wide`
      if(plant.size.avg_height) {
        description += ' and'
      }
    }
    if(plant.size.avg_height) {
      description += ` about ${plant.size.avg_height}\" tall.`
    }

    return String.capitalize(description.trim().toLowerCase());
  }
}
