import BedTemplateSource from 'sources/BedTemplateSource'

describe('BedTemplateSource', function() {
  let server;

  beforeEach( function () {
    server = sinon.fakeServer.create();
  });
  afterEach( function () {
    server.restore();
  });

  describe('suggestTemplates', function() {
    let bed = {width: 30, depth: 6};

    it('returns matching templates if successful', function(done) {
      const bedTemplateFixture = fixture.load('bed_templates/response_suggestions.json');
      bedTemplateFixture.length.should.equal(2); // Assumption

      BedTemplateSource.suggestTemplates(bed).then( (bedTemplates) => {
        bedTemplates.should.deep.equal(bedTemplateFixture);
        done();
      })

      const request = server.requests[0];
      request.url.should.equal(`${API_SEARCH_HOST}/bed_templates/suggestions?width=${bed.width}&depth=${bed.depth}`);
      request.method.should.equal('GET');
      request.respond(200, { 'Content-Type' : 'application/json' }, JSON.stringify(bedTemplateFixture));
    });

    it('handles an error case', function(done) {
      BedTemplateSource.suggestTemplates(bed).catch( (xhr) => {
        debugger;
        done();
      });

      const request = server.requests[0];
      request.respond(400);
    });
  });
});