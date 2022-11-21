const db =require('./db.js')

function insertData(first_name,last_name,email,phone,password,callback){
    sql='INSERT INTO signup_details (first_name,last_name,email,phone,password) VALUES (?,?,?,?,?)'
    db.executeDb(sql,[first_name,last_name,email,phone,password],callback)
}
module.exports.insertData=insertData