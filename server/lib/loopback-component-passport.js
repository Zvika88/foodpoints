
var loopbackPassport = require('loopback-component-passport');
var util = require('util');

exports.UserIdentity = loopbackPassport.UserIdentity;
exports.UserCredential = loopbackPassport.UserCredential;
exports.ApplicationCredential = loopbackPassport.ApplicationCredential;

//PassportConfigurator = loopbackPassport.PassportConfigurator;
function PassportConfigurator(options) {
	loopbackPassport.PassportConfigurator.apply(this, arguments);
//	loopbackPassport.PassportConfigurator.call(this);
}

util.inherits(PassportConfigurator, loopbackPassport.PassportConfigurator);

exports.PassportConfigurator = PassportConfigurator