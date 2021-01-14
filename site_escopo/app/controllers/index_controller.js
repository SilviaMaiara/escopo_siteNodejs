module.exports.index = function(application, req, res){
    res.render('index_view', { validation: {} }); 
}

module.exports.authenticate = function(application, req, res){
    var formData = req.body;

    req.assert('email', 'E-mail não pode ser vazio').notEmpty();
    req.assert('password', 'Senha não pode ser vazia').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index_view', { validation: errors });
        return;
    }

    var connection = application.config.dbConnection;
    var usersDAO = new application.app.models.UsersDAO(connection);

    usersDAO.authenticate(formData, req, res);
}