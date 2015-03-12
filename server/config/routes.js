/**
 * Created by sebastian.weikart on 12/03/2015.
 */

module.exports = function(app) {
    app.get('/partials/*', function(req, res) {
        console.log('request for partial ' + req.params[0] );
        res.render('../../public/app/' + req.params[0]);

    });

    app.get('*', function(req, resp) {
        console.log('request for ' + req.params[0]);
        resp.render('index');

    });

}