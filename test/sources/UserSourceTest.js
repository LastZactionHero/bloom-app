'use strict';

import UserSource from 'sources/UserSource';

describe('UserSource', function () {
  let server;

  beforeEach( function () {
    server = sinon.fakeServer.create();
  });
  afterEach( function () {
    server.restore();
  });

  const email = 'user@site.com';
  const password = '1234abcd';

  describe('sign_up', function () {
    it('resolves with a User object if successful', function (done) {
      const responseDataUser = { email: 'user@site.com' };
      const responseJSONUser = JSON.stringify(responseDataUser);

      UserSource.sign_up(email, password).then( (user) => {
        user.should.deep.equal(responseDataUser);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(API_USER_HOST + '/users/sign_up');
      request.requestBody.should.equal(JSON.stringify({email: email, password: password}));
      request.respond(201, { 'Content-Type': 'application/json' }, responseJSONUser);
    });

    it('rejects with an error if unsuccessful', function (done) {
      const responseDataError = { errors: { email: ['is taken'] } };
      const responseJSONError = JSON.stringify(responseDataError);

      UserSource.sign_up(email, password).catch( (xhr) => {
        xhr.status.should.equal(400)
        xhr.responseJSON.should.deep.equal(responseDataError);
        done();
      });

      server.requests[0].respond(400, { 'Content-Type': 'application/json' }, responseJSONError);
    });
  });

  describe('sign_in', function() {
    it('resolves to a User object if successful', function (done) {
      const responseDataUser = { email: 'user@site.com' };
      const responseJSONUser = JSON.stringify(responseDataUser);

      UserSource.sign_in(email, password).then( (user) => {
        user.should.deep.equal(responseDataUser);
        done();
      });

      const request = server.requests[0];
      request.url.should.equal(API_USER_HOST + '/users/sign_in');
      request.requestBody.should.equal(JSON.stringify({email: email, password: password}));
      request.respond(201, { 'Content-Type': 'application/json' }, responseJSONUser);
    });

    it('rejects with an error if unsuccessful', function (done) {
      const responseDataError = { errors: { email: ['is taken'] } };
      const responseJSONError = JSON.stringify(responseDataError);

      UserSource.sign_in(email, password).catch( (xhr) => {
        xhr.status.should.equal(400)
        xhr.responseJSON.should.deep.equal(responseDataError);
        done();
      });

      server.requests[0].respond(400, { 'Content-Type': 'application/json' }, responseJSONError);
    });
  });
});