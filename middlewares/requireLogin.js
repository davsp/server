module.exports = (req, res, next) => {
    //"next" function will call next middleware in the chain once this is done.
    
    //kick out on this middleware if there is no user!
    if (!req.user) {
        return res.status(401).send({
            error: 'You must log in!'
        })
    }

    next(); // move to the next if there is a user.

}