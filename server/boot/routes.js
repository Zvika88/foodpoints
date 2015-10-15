module.exports = function(app) {
  var User = app.models.user;
  var router = app.loopback.Router();
/*
  router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
  });
*/

  //verified
  app.get('/request-password-reset', function(req, res) {
    res.render('password-reset-request', {
    	"email": ""
    });
  });

  //send an email with instructions to reset an existing user's password
  router.post('/request-password-reset', function(req, res, next) {
    User.resetPassword({
      email: req.body.email
    }, function(err) {
      if (err) return res.status(401).send(err);

      res.render('response', {
        title: 'Cambio de contraseña solicitada',
        content: 'Revise su correo electrónico para obtener más instrucciones',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });

  //show password reset form
  router.get('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    res.render('password-reset', {
      accessToken: req.accessToken.id
    });
  });

  //reset the user's pasword
  router.post('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);

    //verify passwords match
    if (!req.body.password
        || !req.body.confirmation
        || req.body.password !== req.body.confirmation) {
      return res.sendStatus(400, new Error('Passwords do not match'));
    }

    User.findById(req.accessToken.userId, function(err, user) {
      if (err) return res.sendStatus(404);
      user.updateAttribute('password', req.body.password, function(err, user) {
      if (err) return res.sendStatus(404);
        console.log('> password reset processed successfully');
        res.render('response', {
          title: 'Cambio exitoso',
          content: 'Su contraseña ha sido restablecida correctamente',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        });
      });
    });
    
  });
 
  app.use(router);
}