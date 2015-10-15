var lt = require('loopback-testing');
var assert = require('assert');
var app = require('../../../server/server.js'); //path to app.js or server.js

app.models.roleMapping = app.models.RoleMapping;

describe('/api/v1/shops error', function() {
  lt.beforeEach.withApp(app);

  lt.beforeEach.givenLoggedInUser({email: 'foo2@bar.com',password:"password", "emailVerified": true});
  lt.describe.whenCalledRemotely('POST', '/api/v1/shops', {name: 'name'}, function() {
    lt.it.shouldBeDenied();
  });
});

describe('/api/v1/shops ok', function() {
  lt.beforeEach.withApp(app);

  lt.beforeEach.givenLoggedInUserWithRole(
  	{email: 'foo2@bar.com',password:"password", emailVerified:true},
  	'admin');
  lt.describe.whenCalledRemotely(
  	'POST', '/api/v1/shops', {name: 'name'}, function() {
    	lt.it.shouldBeAllowed();
  });
});