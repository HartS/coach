'use strict';

const api = require('../../coach/lib'),
  urlParser = require('url'),
  webserver = require('../../coach/test/help/webserver'),
  chai = require('chai');

chai.should();

describe('Run API:', function() {
  let url;

  before(() =>
    webserver.startServer().then(address => {
      url = urlParser.format({
        protocol: 'http',
        hostname: address.address,
        port: address.port,
        pathname: 'info/head.html'
      });
    })
  );

  after(() => webserver.stopServer());

  it('should output correct structure', () =>
    api.run(url).then(advice => {
      ['advice', 'errors', 'url', 'version'].forEach(property =>
        advice.should.have.ownProperty(property)
      );

      [
        'bestpractice',
        'info',
        'performance',
        'privacy',
        'timings',
        'score'
      ].forEach(property => advice.advice.should.have.ownProperty(property));
    }));
});
