import $ from 'jquery'

export default {
  sign_up: function(email, password, promo_code) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: API_USER_HOST + '/users/sign_up',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true
        },
        data: JSON.stringify({
          email: email,
          password: password,
          promo_code: promo_code
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
        url: API_USER_HOST + '/users/sign_in_as',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true
        },
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
  },

  sign_out: function() {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: API_USER_HOST + '/users/sign_out',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true
        }
      })
      .done( () => { resolve() } )
      .fail( () => { reject() } )
    });
  },

  ping: function() {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: API_USER_HOST + '/users/ping',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true
        }
      })
      .done( (response) => { resolve(response) })
      .fail( () => {reject(); });
    })
  },

  upgrade: function(token, promoCode) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: API_USER_HOST + '/users/upgrade',
        contentType: 'application/json',
        data: JSON.stringify({token: token, promo_code: promoCode}),
        xhrFields: {
          withCredentials: true
        }
      })
      .done( (response) => { resolve(response) })
      .fail( () => {reject(); });
    })
  }
}
