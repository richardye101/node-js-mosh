module.exports = function(req, res, next){ //next is the next middleware function
    // 401 unauthorized (no valid web token, but can retry)
    // 403 forbidden (don't try again, cannot access)

    if(!req.user.isAdmin) return res.status(403).send('Access denied.') //forbidden

    next();
}