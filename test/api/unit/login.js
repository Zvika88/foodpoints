var lt = require('loopback-testing');
var assert = require('assert');
var app = require('../../../server/server.js'); //path to app.js or server.js


describe('/api/v1/users', function() {
  lt.beforeEach.withApp(app);

  lt.describe.whenCalledRemotely('GET', '/api/v1/users', function() {
    lt.it.shouldBeDenied();
    it('should have statusCode 401', function() {
      assert.equal(this.res.statusCode, 401);
    });
  });
  
  lt.beforeEach.givenUser({email: 'foo@bar.com',password:"password"});
  lt.describe.whenCalledRemotely('GET', '/api/v1/users', function() {
    lt.it.shouldBeDenied();
  });
});

describe('User.login error', function() {
  lt.beforeEach.withApp(app);
  
  lt.describe.whenCalledRemotely('POST', '/api/v1/users/login', function() {
    it('should have statusCode 400', function() {
      assert.equal(this.res.statusCode, 400);
    });
  });

  lt.beforeEach.givenUser({email: 'foo@bar.com',password:"password"});
  lt.describe.whenCalledRemotely('POST', '/api/v1/users/login', {email: 'foo@bar.com',password:"password"}, function() {
    it('should have statusCode 401', function() {
      assert.equal(this.res.statusCode, 401);
    });
  });
});

describe('User.login ok', function() {
  lt.beforeEach.withApp(app);

  lt.beforeEach.givenUser({email: 'foo2@bar.com',password:"password", "emailVerified": true});
  lt.describe.whenCalledRemotely('POST', '/api/v1/users/login', {email: 'foo2@bar.com',password:"password"}, function() {
    lt.it.shouldBeAllowed();
  });
});
