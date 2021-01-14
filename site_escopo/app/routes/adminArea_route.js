module.exports = function(application){
	application.get('/adminArea', function(req, res){
		application.app.controllers.adminArea_controller.adminArea(application, req, res);
  });
}
