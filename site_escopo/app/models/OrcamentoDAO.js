var crypto = require('crypto');

function OrcamentoDAO(connection){
    this._connection = connection();
}

OrcamentoDAO.prototype.registerOrcamento = function(formData, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("users", function(err, collection){

            var date_orcamento = formData.datetime;

            var mongo = require('mongodb');
            var o_id = mongo.ObjectID(req.session.dataInfo._id);

            collection.update(
                {"_id": o_id},
                {$push: {"orcamento_date": date_orcamento
                }},
                {multi:true}
                )
            mongoclient.close();
            
            res.redirect('/clientArea?msg=A');
            //res.redirect('/clientArea_view?msg=A');
            //res.send("ok");
        });
    });
}

OrcamentoDAO.prototype.searchOrcamento = function(formData, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("users", function(err, collection){

            var mongo = require('mongodb');
            var o_id = mongo.ObjectID(req.session.dataInfo._id);

            collection.find({"_id": o_id}).toArray(function(err, result){
                if(result != undefined){
                    var dataInfo = result[0];
                    var orcamentos = dataInfo.orcamento_date;
                    res.render('orcamento_view', {orcamentos: orcamentos, formData: {} });
                }else{
                    res.render('orcamento_view', {orcamentos: {}, formData: {} });
                }
            });
            mongoclient.close();         
        });
    });    
}

module.exports = function(){
    return OrcamentoDAO;
}