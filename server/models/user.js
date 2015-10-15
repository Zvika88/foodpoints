var path = require('path');
module.exports = function(User) {

    User.beforeRemote('**', function(ctx, user, next) {
      console.log(ctx.methodString, 'was invoked remotely'); // users.prototype.save was invoked remotely
      next();
    });

User.afterRemote('create', function(ctx, user, next) {
  console.log("User.afterRemote create");
  var userModel = user.constructor;
  var app = userModel.app;

  var options = {
    type: 'email',
    to: user.email,
    from: app.get('mailFrom'),
    host: app.get('mailHost'),
    port: app.get('mailPort'),
    subject: 'Thanks for Registering at FooBar',
//    text: 'Please verify your email address!',
//    template: 'verify.ejs',
    template: path.resolve(__dirname, '../../server/views/verify.ejs'),
    redirect: '/verified',
    user: user
  };
 
   // user.verify(options, next);
   //  user.verify(options, function(err, response) {
   //    if (err) {
   //      next(err);
   //      return;
   //    }
   //    console.log('> verification email sent:', response);
   //    ctx.res.render('response', {
   //      title: 'Signed up successfully',
   //      content: 'Please check your email and click on the verification link '
   //        + 'before logging in.',
   //      redirectTo: '/',
   //      redirectToLinkText: 'Log in'
   //    });
   //  });
  next();

});

  //send password reset link when requested
  User.on('resetPasswordRequest', function(info) {
    var app = User.app;
    var url = 'http://' + app.get('mailHost') + ':' + app.get('mailPort') + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' + info.accessToken.id
      + '">aquí</a> para cambiar tu contraseña';
    console.log(html);

    User.app.models.Email.send({
      to: info.email,
      from: app.get('mailFrom'),
      host: app.get('mailHost'),
      port: app.get('mailPort'),
      subject: 'Cambio de contraseña',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  User.balance = function(id, cb) {
    var Model = this;
//    var User = Model.app.models.user;
    var Transaction = Model.app.models.transaction;
    var query = {};
    query.id = id;
    User.findOne({where: query}, function(err, user) {
      if (err || !user) return cb(err,0);

      Transaction.find({where: {userId: user.id}}, function(err, items) {
        var total = items
          .map(function(item) {
            return item.amount;
          })
          .reduce(function(cur, prev) {
            return prev + cur;
          }, 0);
        cb(null, total);
      });
    });
  }

  User.remoteMethod('balance', {
    accepts: [
      {arg: 'id', type: 'any', required: true},
    ],
    returns: {arg: 'amount', type: 'number'},
    http: [
      {path:'/:id/balance', verb: 'get'}
    ]
  });

};
