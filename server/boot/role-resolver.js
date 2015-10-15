module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('shopOwner', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    // if the target model is not project
    if (context.modelName !== 'shop') {
      return reject();
    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    context.model.count({
      ownerId:userId
    }, function(err, count) {
      if (err) {
        return cb(null, false);
      }
      cb(null, count > 0); // true = shop owner
    });

  });
}
