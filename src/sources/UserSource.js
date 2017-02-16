import $ from 'jquery'

export default {
  sign_up: function(email, password) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: API_USER_HOST + '/users/sign_up',
        contentType: 'application/json',
        data: JSON.stringify({
          email: email,
          password: password
        })
      }).done( (response) => {
        resolve(response);
      }).fail( (xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown)
      });
    });
  },

  sign_in: function(email, password) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: API_USER_HOST + '/users/sign_in',
        contentType: 'application/json',
        data: JSON.stringify({
          email: email,
          password: password
        })
      }).done( (response) => {
        resolve(response);
      }).fail( (xhr, textStatus, errorThrown) => {
        reject(xhr, textStatus, errorThrown);
      })
    });
  }
}