var lt = require('loopback-testing');
var assert = require('assert');
var app = require('../../../server/server.js'); //path to app.js or server.js

describe('/api/v1/shops/{id}/debit error', function() {
  lt.beforeEach.withApp(app);

  lt.beforeEach.givenLoggedInUser({id:'1a', email: 'foo2@bar.com',password:"password", "emailVerified": true});
  lt.beforeEach.givenModel('shop', {id:'1a', name:'name'});

  lt.describe.whenCalledRemotely('POST', '/api/v1/shops/1a/debit', {email: 'foo3@bar.com',password:"password"}, function() {
    lt.it.shouldBeDenied();
  });
});

describe('/api/v1/shops/{id}/debit error', function() {
  lt.beforeEach.withApp(app);

  lt.beforeEach.givenLoggedInUser({id:'1a', email: 'foo2@bar.com',password:"password", "emailVerified": true});
  lt.beforeEach.givenModel('shop', {id:'1a', name:'name', ownerId:'1a'});

  lt.describe.whenCalledRemotely('POST', '/api/v1/shops/1a/debit', {email: 'foo3@bar.com',amount: 10}, function() {
    lt.it.shouldBeAllowed();
    it('should', function() {
      console.log(this.res.body);
      assert.equal('success' in this.res.body, true);
      assert.equal(this.res.body['success'], false);
    });
  });
});