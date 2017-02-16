'use strict';

import YardSource from 'sources/YardSource';

describe('YardSource', function() {
  let server;

  beforeEach( function () {
    server = sinon.fakeServer.create();
  });
  afterEach( function () {
    server.restore();
  });

  describe('index', function(){
    it('returns a list of yards if successful', function(done) {
      const yardsFixture = [];

      YardSource.index().then( (yards) => {
        yards.should.deep.equal(yardsFixture);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/yards`);
      request.method.should.equal('GET');
      request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(yardsFixture));
    });

    it('returns an error if failed', function(done) {
      YardSource.index().catch( () => { done(); });

      const request = server.requests[0];
      request.respond(400, { 'Content-Type': 'application/json' }, null);
    });
  });

  describe('show', function() {

  });

  describe('create', function() {

  });

  describe('update', function() {

  });

  describe('destroy', function() {

  });
});