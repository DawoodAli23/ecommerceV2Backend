const db = require("../database/db");
const bcrypt = require("bcrypt");
const { createToken } = require("../middlewares");
const saltRounds = 10;

const signUp = async(username,email,password,socialMediaToken) =>{
    const query = "INSERT INTO users(username,email,password) VALUES(?,?,?)";
    const encryptedPassword = await bcrypt.hash(password,saltRounds);
    // console.log(encryptedPassword);
    return new Promise((resolve,reject)=>{
        db.query(query,[username,email,encryptedPassword],(err,result)=>{
            if(err){
                reject(err.code)
            }if(result){
                resolve("USER CREATED")
            }else{
                reject("SOME ERROR OCCURED")
            }
        })
    })
}

const signIn = async(email,password,socialMediaToken)=>{
    try {
        const result = await checkIfUserExist(email);
        const comparePassword = await bcrypt.compare(password,result.password);
        if(comparePassword){
            const token = await createToken(result.id);
            return token;
        }
    } catch (error) {
        return error;
    }

}

const checkIfUserExist = (email)=>{
    const query = "SELECT * FROM users WHERE email=?";
    return new Promise((resolve,reject)=>{
        db.query(query,[email],(err,result)=>{
            if(err){
                reject(err.code);
            }
            if(result){
                resolve(result[0]);
            }else{
                reject("No user exist with the email");
            }
        })
    })
}

module.exports = {
    signUp,
    signIn
}
