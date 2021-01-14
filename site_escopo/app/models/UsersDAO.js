var crypto = require('crypto');

function UsersDAO(connection){
    this._connection = connection();
}

UsersDAO.prototype.registerUser = function(formData){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("users", function(err, collection){
            //var pass_crypto = crypto.createHash("md5").update(formData.password).digest("hex");
            //formData.password = pass_crypto;
            formData['orcamento_date'] = [];
            collection.insert(formData);
            
            mongoclient.close();
        });
    });
}


UsersDAO.prototype.authenticate = function(formData, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("users", function(err, collection){

            //var pass_crypto = crypto.createHash("md5").update(formData.password).digest("hex");
            //formData.password = pass_crypto;

            collection.find(formData).toArray(function(err, result){
                if(result[0] != undefined){                 
                    req.session.authorized = true;
                    req.session.dataInfo = result[0];
                }

                if(req.session.authorized){
                    res.redirect("/clientArea");
                }else{
                    res.render("index_view", { validation: {} });
                }
            });
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return UsersDAO;
}