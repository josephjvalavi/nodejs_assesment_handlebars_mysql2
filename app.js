const Handlebars = require('handlebars')
const http = require('http')
const url = require('url')
const fs = require('fs');
const path = require('path');
const flight = require('./flightdb.js')
const qs =require('querystring')
registerPartials('navbar','navbar')
const server = http.createServer((req,res)=>{
    const link=url.parse(req.url,true);
    console.log(link)
    let page=link.pathname
    if(page=='/'){
        let context= renderTemplates('home')
        res.end(context)
    }
    else if(page=='/signup' && req.method=='GET'){
        let context= renderTemplates('signup')
        res.end(context)
    }
    else if(page=='/signup' && req.method=='POST'){
        let formData='';
    req.on('data',(res)=>{
        formData+=res.toString();
    }
)
req.on('end',function(){
    let userdata = qs.parse(formData);
    flight.insertData(userdata.firstname,userdata.lastname,userdata.email,userdata.email,userdata.password,(err,result)=>{
        var context ={
            result:{
            success:true,
            error:[]
        }}
        if(err){

            console.log(err)
            context.result.success=false;
            

            
        }
        
        let t = renderTemplates('signup',context);
            res.end(t);
    })

})
}
else if(page=='/login' && req.method=='GET'){
    let context= renderTemplates('login')
    res.end(context)
} 
else if(page=='/login' && req.method=='POST'){
    
    let formData='';
req.on('data',(res)=>{
    formData+=res.toString();
}
)
req.on('end',function(){
let userdata = qs.parse(formData);
flight.check(userdata.email,userdata.password,(err,result)=>{
    var context ={
        result:{
        success:true,
        error:[]
    }}
    if(err){

        console.log('ERRRRRRRRRRRRRRR',err)
        context.result.success=false;
        

        
    }
    else{
    let t = renderTemplates('booking',context);
        res.end(t);

    }
})

})
}


});
server.listen(80)
function renderTemplates(name){
var filepath=path.join(__dirname,'templates',name+'.hbs')
console.log(filepath)
var templateFile = fs.readFileSync(filepath,'utf-8');
var template = Handlebars.compile(templateFile);
return template()

}
function registerPartials(handleName,fileName){
   var filepath=path.join(__dirname,'templates','partials',fileName+'.hbs')
   var templateFile= fs.readFileSync(filepath,'utf-8');
    Handlebars.registerPartial(handleName,templateFile);

}