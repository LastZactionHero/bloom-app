import alt from '../alt';
import TemplateSource from 'sources/TemplateSource';

class TemplateActions {
  fetchPlacements(bed) {
    TemplateSource.fetchPlacements(
      bed.template_id,
      bed.width * 12,
      bed.depth * 12,
      bed.template_plant_mapping
    ).then( (response) => {
      this.fetchPlacementsDone(bed, response.placements);
    }).catch( (xhr) => {
      this.fetchPlacementsFail(bed, xhr);
    });
    return null;
  }

  fetchPlacementsDone(bed, placements) {
    return { bed: bed, placements: placements };
  }

  fetchPlacementsFail(bed, xhr) {
    return { bed: bed, response: (xhr.responseJSON || {}) };
  }
}

export default alt.createActions(TemplateActions);
