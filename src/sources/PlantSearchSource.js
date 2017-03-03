import $ from 'jquery';

export default {
  fetchOptions: () => {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: API_SEARCH_HOST + '/search/options',
        contentType: 'application/json'
      }).done((response) => {
        resolve(response);
      }).fail( (xhr) => ( reject(xhr) ));
    });
  },

  fetchResults: (query, pageIdx) => {
    return new Promise( (resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: API_SEARCH_HOST + '/search/query',
        contentType: 'application/json',
        data: JSON.stringify({page_idx: pageIdx, query: query})
      }).done((response) => {
        resolve(response);
      }).fail( (xhr) => { reject(xhr) });
    });
  }
}
