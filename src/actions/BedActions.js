import alt from '../alt';
import BedTemplateSource from '../sources/BedTemplateSource';

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
    return null;
  }
}

export default alt.createActions(BedActions);