import $ from 'jquery'

export default {
  validate: function(code) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: API_USER_HOST + `/promo_codes/validate?code=${code}`,
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true
        }
      })
      .done( (response) => { resolve(response) })
      .fail( () => {reject(); });
    })
  }
}
