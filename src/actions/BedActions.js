import alt from '../alt';
import BedTemplateSource from '../sources/BedTemplateSource';
import BedSource from '../sources/BedSource';

class BedActions {
  init(bed) {
    return bed;
  }

  startFetchSuggestTemplates(bed) {
    BedTemplateSource.suggestTemplates(bed)
      .then( (templates) => { this.doneFetchSuggestTemplates(templates) })
      .catch( (xhr) => { this.failFetchSuggestTemplates(xhr) })
    return null;
  }

  doneFetchSuggestTemplates(templates) { return templates; }
  failFetchSuggestTemplates(xhr) { return xhr.responseJSON || {}; }

  startSelectTemplate(bed, template) {
    BedSource.setTemplate(bed, template)
      .then( (response) => { this.doneSelectTemplate(response); })
      .catch( (xhr) => {this.failSelectTemplate(xhr) })
    return null;
  }

  doneSelectTemplate(bed) {
    return bed;
  }

  failSelectTemplate(xhr) {
    return xhr.responseJSON || {};
  }

  startUpdate(bed) {
    BedSource.update(bed);
    return null;
  }

  mapTemplatePlant(bed, templatePlant, plant) {
    return {bed: bed, templatePlant: templatePlant, plant: plant};
  }
}

export default alt.createActions(BedActions);
