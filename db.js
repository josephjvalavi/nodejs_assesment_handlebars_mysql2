const mysql= require('mysql2')

const dbDetails = {
    host:'localhost',
    user:'root',
    password:'Valavi@18',
    database:'flight'
}

function executeDb(sql,param,callback){
    const connection = mysql.createConnection(dbDetails);
    connection.connect(err=>console.log(err));
    console.log(sql)
    //sql="SELECT * FROM flight";
    connection.query(sql,param,callback);
    connection.commit();
    connection.end();

}

module.exports.executeDb=executeDb;