'use strict';

import BedSource from 'sources/BedSource';

describe('BedSource', function() {
  let server;

  beforeEach( function () {
    server = sinon.fakeServer.create();
  });
  afterEach( function () {
    server.restore();
  });

  describe('show', function(){
    it('returns a bed if successful', function(done) {
      const bedFixture = fixture.load('beds/bed.json');
      bedFixture.id.should.equal(1); // Assumption

      BedSource.show(bedFixture.id).then( (bed) => {
        bed.should.deep.equal(bedFixture);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/beds/${bedFixture.id}`);
      request.method.should.equal('GET');
      request.respond(200, { 'Content-Type' : 'application/json' }, JSON.stringify(bedFixture));
    });

    it('returns an error if failed', function(done) {
      BedSource.show(10).catch( () => { done(); });
      const request = server.requests[0];
      request.respond(404, { 'Content-Type' : 'application/json' }, null);
    });
  });

  describe('create', function(){
    const bedData = {
      yard_id: 123,
      name: 'Front Yard Bed',
      attached_to_house: false,
      orientation: 'north',
      width: 30.0,
      depth: 6.0,
      sunlight_morning: 'full_sun',
      sunlight_afternoon: 'partial_sun',
      watered: false
    };

    it('requests to create a bed', function(done) {
      const bedFixture = fixture.load('beds/bed.json');

      BedSource.create(bedData).then( (bed) => {
        bed.should.deep.equal(bedFixture);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/beds`);
      request.method.should.equal('POST');

      const requestBody = JSON.parse(request.requestBody);
      requestBody.yard_id.should.equal(bedData.yard_id);
      requestBody.name.should.equal(bedData.name);

      request.respond(201, { 'Content-Type' : 'application/json' }, JSON.stringify(bedFixture));
    });

    it('handles an error', function(done) {
      const errorData = { errors: { width: ['must be present']}};
      BedSource.create(bedData).catch( (xhr) => {
        xhr.status.should.equal(400)
        xhr.responseJSON.should.deep.equal(errorData);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/beds`);
      request.method.should.equal('POST');
      request.respond(400, { 'Content-Type' : 'application/json' }, JSON.stringify(errorData));
    });
  });

  describe('update', function(){
    it('requests to update a bed', function(done) {
      const bedFixture = fixture.load('beds/bed.json');

      BedSource.update(bedFixture).then( (bed) => {
        bed.should.deep.equal(bedFixture);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/beds/${bedFixture.id}`);
      request.method.should.equal('PATCH');

      const requestBody = JSON.parse(request.requestBody);
      requestBody.should.deep.equal(bedFixture);

      request.respond(200, { 'Content-Type' : 'application/json' }, JSON.stringify(bedFixture));
    });

    it('handle an error', function(done) {
      const bedFixture = fixture.load('beds/bed.json');
      const errorData = { errors: { width: ['must be present']}};

      BedSource.update(bedFixture).catch( (xhr) => {
        xhr.status.should.equal(400)
        xhr.responseJSON.should.deep.equal(errorData);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/beds/${bedFixture.id}`);
      request.method.should.equal('PATCH');
      request.respond(400, { 'Content-Type' : 'application/json' }, JSON.stringify(errorData));
    });
  });

  describe('destroy', function() {
    it('requests to destroy a bed', function(done) {
      const bedFixture = fixture.load('beds/bed.json');

      BedSource.destroy(bedFixture).then( () => { done(); });

      const request = server.requests[0];
      request.url.should.equal(`${API_USER_HOST}/beds/${bedFixture.id}`);
      request.method.should.equal('DELETE');
      request.respond(200);
    });

    it('handles an error', function(done) {
      const bedFixture = fixture.load('beds/bed.json');

      BedSource.destroy(bedFixture).catch( () => { done(); });

      const request = server.requests[0];
      request.respond(400);
    });
  });
});