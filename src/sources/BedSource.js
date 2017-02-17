import $ from 'jquery'

export default {
  show: function(bedID) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `${API_USER_HOST}/beds/${bedID}`,
        contentType: 'application/json'
      }).done( (response) => {
        resolve(response);
      }).fail( (xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    });
  },

  create: function(bed) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: `${API_USER_HOST}/beds`,
        contentType: 'application/json',
        data: JSON.stringify(bed)
      }).done( (response) => {
        resolve(response);
      }).fail( (xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    });
  },

  update: function(bed) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'PATCH',
        url: `${API_USER_HOST}/beds/${bed.id}`,
        contentType: 'application/json',
        data: JSON.stringify(bed)
      }).done( (response) => {
        resolve(response);
      }).fail( (xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      });
    });
  },

  destroy: function(bed) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'DELETE',
        url: `${API_USER_HOST}/beds/${bed.id}`
      }).done(
        () => { resolve();
      }).fail( (xhr, textStatus, errorThrown) => {
          reject(xhr, textStatus, errorThrown);
      });
    });
  }
}