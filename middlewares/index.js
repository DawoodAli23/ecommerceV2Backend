const JWT = require("jsonwebtoken")
require("dotenv").config();

const createToken = (id) =>{
    return new Promise((resolve,reject)=>{
        JWT.sign({ id }, process.env.SECRET, function(err, token) {
            if(err){
                reject(err);
            }
            resolve(token);
        });
    })
}





module.exports = {
    createToken,
}
