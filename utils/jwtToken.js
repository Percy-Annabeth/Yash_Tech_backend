//creating a token and saving in cookie

const sendToken = (user,statusCode,res)=>{

    //creating a token
    const token = user.getJWTtoken();

    //setting options for cookie
    const options = {
        expires:new Date(Date.now() + 2*24*60*60*1000),
        httpOnly:true
    };

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    });
};

module.exports = sendToken;

//now use in userController