module.exports.registerView = function(application, req, res){  
    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }
    res.render('register_view', { validation: {}, formData: {}, msg: msg }); 
}


module.exports.registerClient = function(application, req, res){ 
    var formData = req.body;

    req.assert('name', 'Nome não pode ser vazio').notEmpty();
    req.assert('cpf', 'CPF não pode ser vazio').notEmpty();
    req.assert('address', 'Endereço não pode ser vazio').notEmpty();
    req.assert('phone', 'Número de celular não pode ser vazio').notEmpty();
    req.assert('email', 'E-mail não pode ser vazio').notEmpty();
    req.assert('password', 'Senha não pode ser vazia').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('register_view', { validation: errors, formData: {}, msg: {} });
        return;
    }

    var connection = application.config.dbConnection;
    var usersDAO = new application.app.models.UsersDAO(connection);

    usersDAO.registerUser(formData);
    res.redirect('/registerView?msg=A');
}