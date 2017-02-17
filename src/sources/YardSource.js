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

  show: function(yardID) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `${API_USER_HOST}/yards/${yardID}`,
        contentType: 'application/json'
      }).done( (response) => {
        resolve(response);
      }).fail( (xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    });
  },

  create: function(yard) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: `${API_USER_HOST}/yards`,
        contentType: 'application/json'
      }).done( (response) => {
        resolve(response);
      }).fail( (xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    })
  },

  update: function(yard) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'PATCH',
        url: `${API_USER_HOST}/yards/${yard.id}`,
        contentType: 'application/json',
        data: yard
      }).done( (response) => {
        resolve(response);
      }).fail( (xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    });
  },

  destroy: function(yard) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'DELETE',
        url: `${API_USER_HOST}/yards/${yard.id}`
      }).done( 
        () => { resolve();
      }).fail( 
        (xhr, r));
    })
  }
}