module.exports = function(application){
	application.get('/registerView', function(req, res){
        application.app.controllers.register_controller.registerView(application, req, res);
	});
	application.post('/registerClient', function(req, res){
        application.app.controllers.register_controller.registerClient(application, req, res);
	});
}