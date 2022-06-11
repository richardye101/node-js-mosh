// not needed since we are using express-async-errors now
module.exports = function (handler){
    return async (req, res, next) =>{
        try{
            await handler(req, res);
        }
        catch(ex){
            next(ex);
        }
    };
}