module.exports.admin = function(application, req, res){
    res.render('admin_view', { validation: {} }); 
}

module.exports.authenticateAdmin = function(application, req, res){
    var formData = req.body;

    req.assert('user', 'Usuário não pode ser vazio').notEmpty();
    req.assert('password', 'Senha não pode ser vazia').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('admin_view', { validation: errors });
        return;
    }

    var connection = application.config.dbConnection;
    var adminDAO = new application.app.models.AdminDAO(connection);

    adminDAO.authenticate(formData, req, res);
}