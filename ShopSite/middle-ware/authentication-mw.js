
function authMW(req, res, next) {

    if(!req.session.isAuth || !req.session.user){
        return next();
    }

    res.locals.isAuth = true;

    if(req.session.isAdmin){
        res.locals.isAdmin = true;
    } else {
        res.locals.isAdmin = false;
    }
    
    next();
}
module.exports = authMW;