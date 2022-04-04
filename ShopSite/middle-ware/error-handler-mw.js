function handleError(error, req, res, next){
    if(error.code === 404){
        return res.status(404).render('errors/404');
    }
     res.status(500).render('errors/500');
}

module.exports = handleError;