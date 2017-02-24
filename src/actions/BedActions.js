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
      .then( (bed) => { this.doneSelectTemplate(bed); })
      .catch( (xhr) => {this.failSelectTemplate(xhr) })
    return null;
  }

  doneSelectTemplate(bed) {
    // stopped here, set this up second
    return bed;
  }

  failSelectTemplate(xhr) {
    // stopped here, set this up first
    return xhr.responseJSON || {};
  }
}

export default alt.createActions(BedActions);