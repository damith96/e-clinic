const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('Authorization');
        //token = req.headers.authorization;
        if (token) {
            token = token.slice(7);
            // token.split(" ")[1];
            verify(token, "qwe1234", (err, decoded)=>{
                if(err){
                    return res.json({
                        success: false,
                        message: 'Invalid token'
                    });
                }
                next();
            });
        } else {
            return res.json({
                success: false,
                message: 'Access denied! unauthorized user'
            });
        }
    }
}

// module.exports = (req, res, next) =>{
//     try{
//         const token = req.headers.authorization.split(" ")[1];
//         const decodedToken = verify(token,"qwe1234");
//         req.userData = {email: decodedToken.email, userId: decodedToken.userId}//Don't override the incoming request
//         next();
//     }catch(error){
//         res.status(401).json({message: "Auth failed"});
//     }
// }