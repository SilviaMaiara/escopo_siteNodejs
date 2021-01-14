var crypto = require('crypto');

function AdminDAO(connection){
    this._connection = connection();
}

AdminDAO.prototype.authenticate = function(formData, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usersAdmin", function(err, collection){

            //var pass_crypto = crypto.createHash("md5").update(formData.password).digest("hex");
            //formData.password = pass_crypto;

            collection.find(formData).toArray(function(err, result){            
                if(result[0] != undefined){                 
                    req.session.authorizedAdmin = true;
                    req.session.adminData = result[0];
                }
            });
        });
        
        mongoclient.collection("users", function(err, collection){

            //var pass_crypto = crypto.createHash("md5").update(formData.password).digest("hex");
            //formData.password = pass_crypto;

            collection.find().toArray(function(err, result){
                
                if(result[0] != undefined){                 
                    req.session.userRegistration = result;
                }   
                
                if(req.session.authorizedAdmin){
                    res.redirect("/adminArea");
                }else{
                    res.render("admin_view", { validation: {} });
                }
            });
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return AdminDAO;
}