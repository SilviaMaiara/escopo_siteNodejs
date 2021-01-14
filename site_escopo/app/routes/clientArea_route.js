module.exports = function(application){
	application.get('/clientArea', function(req, res){
       	application.app.controllers.clientArea_controller.clientArea(application, req, res);
	});

	application.get('/exit', function(req, res){
		application.app.controllers.clientArea_controller.exit(application, req, res);
	});

	application.get('/orcamentoOpen', function(req, res){
		application.app.controllers.clientArea_controller.orcamentoOpen(application, req, res);
	});

	application.get('/orcamentosView', function(req, res){
		application.app.controllers.clientArea_controller.orcamentosView(application, req, res);
	});

	application.post('/orcamentoCreate', function(req, res){
		application.app.controllers.clientArea_controller.orcamentoCreate(application, req, res);
	});	
}


