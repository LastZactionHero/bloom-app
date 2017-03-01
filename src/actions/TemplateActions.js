import alt from '../alt';
import TemplateSource from 'sources/TemplateSource';

class TemplateActions {
  fetchPlacements(bed) {
    TemplateSource.fetchPlacements(
      bed.template_id,
      bed.width * 12,
      bed.depth * 12
    ).then( (response) => {
      this.fetchPlacementsDone(response.placements);
    }).catch( (xhr) => {
      this.fetchPlacementsFail(xhr);
    });
    return null;
  }

  fetchPlacementsDone(placements) {
    return placements;
  }

  fetchPlacementsFail(xhr) {
    return xhr.responseJSON || {};
  }
}

export default alt.createActions(TemplateActions);
