module.exports = function(application){
	application.get('/admin', function(req, res){
		application.app.controllers.admin_controller.admin(application, req, res);
  });
    
  application.post('/adminArea', function(req, res){
		application.app.controllers.admin_controller.authenticateAdmin(application, req, res);
	});
}

