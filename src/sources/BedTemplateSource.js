import $ from 'jquery';

export default {
  suggestTemplates: function(bed) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `${API_SEARCH_HOST}/bed_templates/suggestions?width=${bed.width}&depth=${bed.depth}`
      }).done( (response) => { resolve(response ) })
      .fail( (xhr) => { reject(xhr) })
    })
  }
}