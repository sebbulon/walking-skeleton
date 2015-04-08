/**
 * Created by sebastian.weikart on 12/03/2015.
 */

var auth = require('./auth'),
    mongoose = require('mongoose'),
    users = require('../api/controllers/users'),
    courses = require('../api/controllers/courses'),
   User = mongoose.model('User') ;


module.exports = function(app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);


    app.post('/api/users', auth.requiresApiLogin, users.createUser);
    app.put('/api/users', auth.requiresApiLogin, users.updateUser);


    app.get('/api/courses', courses.getCourses);




    app.get('/partials/*', function(req, res) {
        console.log('request for partial ' + req.params[0] );
        res.render('../../public/app/' + req.params[0]);

    });

    app.post('/login', auth.authenticate);

    app.post('/logout',  function(req, res) {
            req.logout();
            res.end();
        }

    );

    app.all('/api/*', function(req, res) {
        res.sendStatus(404);
    });

    app.get('*', function(req, resp) {
        console.log('request for ' + req.params[0]);
        if(req.user) {
            req.user.salt = ''; // TODO remove salt - find better solution
        };
        resp.render('index', {

            bootstrappedUser: req.user
        });

    });

}