module.exports = function(Shop) {
  var loopback = require('loopback');
  var path = require('path');

    function sendEmail(user, options) {
      var Email = options.mailer || loopback.getModelByType(loopback.Email);
      options.text = options.text || '';
      options.from = options.from || Shop.app.get('mailFrom') || 'example@example.com'
      options.subject = options.subject || ''

      var template = loopback.template(options.template);
      Email.send({
        to: options.to || user.email,
        from: options.from,
        subject: options.subject,
        text: options.text,
        html: template(options)
      }, function (err, email) {
        if(err) {
//          fn(err);
        } else {
//          fn(null, true);
        }
      });
    }

	Shop.beforeCreate = function (next) {
		var app = this;
		app.created = app.modified = new Date();
		next();
	};

  //credit
  Shop.credit = function(id, email, amount, cb) {

    var Model = this;

    var options = {}
    options.template = path.resolve(options.template || path.join(__dirname, '..', '..', 'templates', 'credit.ejs'));
//    options.from = '';
    options.subject = 'Acumular foodpoints';
//    options.text = 'Credit';
    percent = Shop.app.get('creditPercent')
    if (percent === undefined)
      percent = 0.05;

    options.amount = (amount * percent).toFixed();

    this.findById(id, function (err, shop) {
      if (err || !shop) {
        cb && cb(err, null);
        return;
      }

      options.shop_name = shop.name;

      var User = Model.app.models.user;
      var Transaction = Model.app.models.transaction;

      var transaction = {};
      transaction.shopId = id;
      transaction.amount = options.amount;
      var query = {};
      query.email = email;
      User.findOne({where: query}, function(err, user) {
        if (err) return cb(err);
        if (user){
          transaction.userId = user.id;
          Transaction.create(transaction, function(er, result) {
            if (err) return cb(err);
            Transaction.find({where: {userId: user.id}}, function(err, items) {
              var total = items
                .map(function(item) {
                  return item.amount;
                })
                .reduce(function(cur, prev) {
                  return prev + cur;
                }, 0);
              options.total = total;
              sendEmail(user, options);
              cb(null, true);
            });
          });
        }else{
          query.password = "email";
          User.create(query, function(err, user){
            if (err) return cb(err);
            transaction.userId = user.id;
            Transaction.create(transaction, function(er, result) {
              if (err) return cb(err);
              Transaction.find({where: {userId: user.id}}, function(err, items) {
                var total = items
                  .map(function(item) {
                    return item.amount;
                  })
                  .reduce(function(cur, prev) {
                    return prev + cur;
                  }, 0);
                options.total = total;
                sendEmail(user, options);
                cb(null, true);
              });
            });
          });
          
        }
      });
    });
  };

  Shop.remoteMethod('credit', {
    accepts: [
      {arg: 'id', type: 'any', required: true},
      {arg: 'email', type: 'string', required: true},
      {arg: 'amount', type: 'number', required: true},
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: [
      {path:'/:id/credit', verb: 'post'}
    ]
  });

  //debit
  Shop.debit = function(id, email, amount, cb) {
    var Model = this;

    var options = {}
    options.template = path.resolve(options.template || path.join(__dirname, '..', '..', 'templates', 'debit.ejs'));
//    options.from = '';
    options.subject = 'Canjear FoodPoints';
//    options.text = 'Debit';

    options.amount = amount;
    
    this.findById(id, function (err, shop) {
      if (err || !shop) {
        cb && cb(err, null);
        return;
      }

      options.shop_name = shop.name;

      var User = Model.app.models.user;
      var Transaction = Model.app.models.transaction;

      var transaction = {};
      transaction.shopId = id;
      transaction.amount = -amount;
      var query = {};
      query.email = email;
      User.findOne({where: query}, function(err, user) {
        if (err) return cb(err);
        if (user){
          transaction.userId = user.id;
          Shop.balance(email, function(err1, result) {
            if (err1) return cb(err1);
            if (result<amount){
              cb(null, false);
              return;
            }
            Transaction.create(transaction, function(er, result) {
              if (er) return cb(er);
              Transaction.find({where: {userId: user.id}}, function(err, items) {
                var total = items
                  .map(function(item) {
                    return item.amount;
                  })
                  .reduce(function(cur, prev) {
                    return prev + cur;
                  }, 0);
                options.total = total;
                sendEmail(user, options);
                cb(null, true);
              });
            });
          });
        }else{
          cb(null, false);
        }
      });
    });

  };

  Shop.remoteMethod('debit', {
    accepts: [
      {arg: 'id', type: 'any', required: true},
      {arg: 'email', type: 'string', required: true},
      {arg: 'amount', type: 'number', required: true},
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: [
      {path:'/:id/debit', verb: 'post'}
    ]
  });

  Shop.balance = function(email, cb) {
    var Model = this;
    var User = Model.app.models.user;
    var Transaction = Model.app.models.transaction;
    var query = {};
    query.email = email;
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

  Shop.remoteMethod('balance', {
    accepts: [
      {arg: 'email', type: 'string', required: true},
    ],
    returns: {arg: 'amount', type: 'number'},
    http: [
      {path:'/balance', verb: 'post'}
    ]
  });

};
