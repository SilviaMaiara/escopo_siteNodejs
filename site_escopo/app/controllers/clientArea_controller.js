module.exports.clientArea = function(application, req, res){

    if(req.session.authorized!== true){
        res.send('Usuário precisa fazer login');
        return;   
    }   
    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }
    var dataInfo = req.session.dataInfo;
    res.render('clientArea_view', { register: dataInfo, formData: {}, msg: msg }); 
}

module.exports.exit = function(application, req, res){
    req.session.destroy(function(err){
        res.render('index_view', { validation: {} });
    });
}

module.exports.orcamentoOpen = function(application, req, res){   
    res.render('orcamentoOpen_view', {validation: {}, formData: {} });
}

module.exports.orcamentosView = function(application, req, res){
    var dataInfo = req.session.dataInfo;
    var connection = application.config.dbConnection;
    var orcamentoDAO = new application.app.models.OrcamentoDAO(connection);
    orcamentoDAO.searchOrcamento(dataInfo, req, res);
}

module.exports.orcamentoCreate = function(application, req, res){
    var formData = req.body;
    var connection = application.config.dbConnection;
    var orcamentoDAO = new application.app.models.OrcamentoDAO(connection);
    orcamentoDAO.registerOrcamento(formData, req, res);
}
