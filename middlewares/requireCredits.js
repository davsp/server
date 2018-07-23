module.exports = (req, res, next) => {
    //"next" function will call next middleware in the chain once this is done.
    
    //kick out on this middleware if there is no user!
    
    if (req.user.credits < 1 ) {
        return res.status(403).send({
            error: 'Not enough credits!'
        })
    }

    next(); // move to the next if there is a user.

}