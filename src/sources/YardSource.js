import $ from 'jquery';

export default {
  index: function() {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: API_USER_HOST + '/yards',
        contentType: 'application/json'
      }).done( (response) => {
        resolve(response);
      }).fail( (xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    });
  },

  show: function(yard) {

  },

  create: function(yard) {

  },

  update: function(yard) {

  },

  destroy: function(yard) {

  }
}