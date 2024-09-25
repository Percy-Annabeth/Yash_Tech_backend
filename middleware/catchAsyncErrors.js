module.exports = (catchingAsyncErrors) => (req,res,next) => {
    Promise.resolve(catchingAsyncErrors(req,res,next)).catch(next);
};