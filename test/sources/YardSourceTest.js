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
      const yardsFixture = fixture.load('yards/response_index.json');

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
    it('fetches a yard', function(done) {
      const yardFixture = fixture.load('yards/yard.json');
      yardFixture.id.should.equal(1); // Assumption

      YardSource.show(yardFixture.id).then( (yard) => {
        yard.should.deep.equal(yardFixture);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/yards/${yardFixture.id}`);
      request.method.should.equal('GET');
      request.respond(200, { 'Content-Type' : 'application/json' }, JSON.stringify(yardFixture));
    });

    it('returns an error if failed', function(done) {
      YardSource.show(10).catch( () => { done(); });
      const request = server.requests[0];
      request.respond(404, { 'Content-Type' : 'application/json' }, null);
    });
  });

  describe('create', function() {
    const yardData = {
      zipcode: '46240',
      zone: '5A',
      soil: 'moderate'
    };

    it('requests to create a yard', function(done) {
      const yardFixture = fixture.load('yards/yard.json');

      YardSource.create(yardData).then( (yard) => {
        yard.should.deep.equal(yardFixture);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/yards`);
      request.method.should.equal('POST');
      request.respond(201, { 'Content-Type' : 'application/json' }, JSON.stringify(yardFixture));
    });

    it('handles an error', function(done) {
      const errorData = { errors: { zipcode: ['must be present']}};
      YardSource.create(yardData).catch( (xhr) => {
        xhr.status.should.equal(400)
        xhr.responseJSON.should.deep.equal(errorData);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/yards`);
      request.method.should.equal('POST');
      request.respond(400, { 'Content-Type' : 'application/json' }, JSON.stringify(errorData));
    });
  });

  describe('update', function() {
    it('requests to update a yard', function(done) {
      const yardFixture = fixture.load('yards/yard.json');

      YardSource.update(yardFixture).then( (yard) => {
        yard.should.deep.equal(yardFixture);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/yards/${yardFixture.id}`);
      request.method.should.equal('PATCH');
      request.respond(200, { 'Content-Type' : 'application/json' }, JSON.stringify(yardFixture));
    });

    it('handle an error', function(done) {
      const yardFixture = fixture.load('yards/yard.json');
      const errorData = { errors: { zipcode: ['must be present']}};

      YardSource.update(yardFixture).catch( (xhr) => {
        xhr.status.should.equal(400)
        xhr.responseJSON.should.deep.equal(errorData);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/yards/${yardFixture.id}`);
      request.method.should.equal('PATCH');
      request.respond(400, { 'Content-Type' : 'application/json' }, JSON.stringify(errorData));
    });
  });

  describe('destroy', function() {
    it('requests to destroy a yard', function(done) {
      const yardFixture = fixture.load('yards/yard.json');

      YardSource.destroy(yardFixture).then( () => { done(); });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/yards/${yardFixture.id}`);
      request.method.should.equal('DELETE');
      request.respond(200);
    });

    it('handles an error', function(done) {
      const yardFixture = fixture.load('yards/yard.json');

      YardSource.destroy(yardFixture).catch( () => { done(); });

      const request = server.requests[0];
      request.respond(400);
    });
  });
});