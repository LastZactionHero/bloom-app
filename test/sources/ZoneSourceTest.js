import ZoneSource from 'sources/ZoneSource'

describe('ZoneSource', function() {
  describe('findZone', function(){
    let server;

    beforeEach( function () {
      server = sinon.fakeServer.create();
    });
    afterEach( function () {
      server.restore();
    });

    it('returns the zone value if successful', function(done){
      const responseZone = {zone: '5'};
      const zipcode = '46240';
      ZoneSource.findZone(zipcode).then( (zone) => {
        zone.should.equal(responseZone.zone);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_SEARCH_HOST}/zones/search?zipcode=${zipcode}`)
      request.respond(200, {'Content-Type' : 'application/json'}, JSON.stringify(responseZone));
    });

    it('handles an error case', function() {
      const zipcode = 'not_a_zipcode';
      ZoneSource.findZone(zipcode).catch( (xhr) => { done(); });
      const request = server.requests[0];
      request.respond(400, {'Content-Type' : 'application/json'});
    });
  });
});
