import $ from 'jquery';

export default {
  fetchTemplates() {
    return new Promise( (resolve) => {
      $.ajax({
        method: 'GET',
        url: API_SEARCH_HOST + '/bed_templates',
        contentType: 'application/json'
      }).done((response) => {
        resolve(response);
      });
    });
  },

  fetchPlacements(templateID, width, height) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `${API_SEARCH_HOST}/bed_templates/${templateID}/placements`,
        contentType: 'application/json',
        data: {
          width: width,
          height: height
        }
      }).done((response) => {
        resolve(response);
      }).fail((xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    });
  },
  
  saveConfig(template) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'PATCH',
        url: `${API_SEARCH_HOST}/bed_templates/${template.id}`,
        contentType: 'application/json',
        data: JSON.stringify({
          config: template.config
        })
      }).done((response) => {
        resolve(response);
      }).fail((xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    });
  },

  createNewTemplate(name) {
    const config = {
      size: {
          design: {
             width: 360,
             height: 72
          },
          max: {
             width: 9999,
             height: 9999
          },
          min: {
             width: 24,
             height: 24
          }
       },
       zones: [
          '5'
       ],
       cell:  {
         type: 'PlantGridCell',
         width_percent: 1.0,
         height_percent: 0.7,
         plant: {
            label: 'A',
            width: 36,
            horizontal_spacing: 0,
            vertical_spacing: 0,
            search_query: {

            }
         },
         pattern: 'SingleRowPositionPattern',
         tooltip: 'This is a great plant for all occasions.',
         options: {

         }
      }
    }
    config.name = name;

    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: `${API_SEARCH_HOST}/bed_templates`,
        contentType: 'application/json',
        data: JSON.stringify({
          config: JSON.stringify(config, null, 4)
        })
      }).done((response) => {
        resolve(response);
      }).fail((xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    });
  },

  deleteTemplate(template) {
    $.ajax({
      method: 'DELETE',
      url: `${API_SEARCH_HOST}/bed_templates/${template.id}`
    })
  }
}