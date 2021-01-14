module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index_controller.index(application, req, res);
	});

	application.post('/authenticate', function(req, res){
		application.app.controllers.index_controller.authenticate(application, req, res);
	});	
}
