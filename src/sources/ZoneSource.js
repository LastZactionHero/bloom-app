import $ from 'jquery';

export default {
  findZone: function(zipcode) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `${API_SEARCH_HOST}/zones/search?zipcode=${zipcode}`
      }).done( (response) => resolve(response.zone) )
      .fail( (xhr) => resolve(xhr) );
    });
  }
}
