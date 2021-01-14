module.exports.adminArea = function(application, req, res){
    if(req.session.authorizedAdmin!== true){
        res.send('Admin precisa fazer login');
        return;   
    }  
    var adminData = req.session.adminData;
    var userRegistration = req.session.userRegistration;
    res.render('adminArea_view', { adminData: adminData, register: userRegistration }); 
}