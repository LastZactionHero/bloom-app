import alt from '../alt'
import TemplateActions from '../actions/TemplateActions';

class TemplateStore {
  constructor() {
    this.bindListeners({
      handleUpdateTemplates: TemplateActions.UPDATE_TEMPLATES,
      handleSetActiveTemplate: TemplateActions.SET_ACTIVE_TEMPLATE,
      handleSetPlacementWidth: TemplateActions.SET_PLACEMENT_WIDTH,
      handleSetPlacementHeight: TemplateActions.SET_PLACEMENT_HEIGHT,
      handleUpdatePlacements: TemplateActions.UPDATE_PLACEMENTS,
      handleFetchPlacements: TemplateActions.FETCH_PLACEMENTS,
      handleSetConfig: TemplateActions.SET_CONFIG,
      handleSaveConfig: TemplateActions.SAVE_CONFIG,
      handleUpdateActiveTemplate: TemplateActions.UPDATE_ACTIVE_TEMPLATE,
      handleNewTemplateCreated: TemplateActions.NEW_TEMPLATE_CREATED,
      handleTemplateDeleted: TemplateActions.DELETE_TEMPLATE
    });
    this.templates = [];
    this.activeTemplate = null;
    this.placementWidth = 360;
    this.placementHeight = 72;
    this.activePlacements = null;
  }

  handleUpdateTemplates(templates) {
    this.templates = templates;
  }

  handleSetActiveTemplate(template) {
    this.activeTemplate = template;
  }

  handleSetPlacementWidth(width) {
    this.placementWidth = width;
  }

  handleSetPlacementHeight(height) {
    this.placementHeight = height;
  }

  handleUpdatePlacements(placements) {
    this.activePlacements = placements;
  }

  handleFetchPlacements() {
    this.activePlacements = null;
  }

  handleSetConfig(config) {
    this.activeTemplate.config = config;
  }

  handleSaveConfig() {
    this.activePlacements = null;
  }

  handleUpdateActiveTemplate(template) {
    this.activeTemplate = template;

    // Replace the template
    let existingTemplate = this.templates.find((t) => {return t.id == template.id});
    let idx = this.templates.indexOf(existingTemplate);
    this.templates[idx] = template;
  }

  handleNewTemplateCreated(template) {
    this.templates.push(template);
    this.activeTemplate = template;
  }

  handleTemplateDeleted(template) {
    this.templates.splice(this.templates.indexOf(template), 1);
    this.activeTemplate = null;
  }
}

export default alt.createStore(TemplateStore, 'TemplateStore');