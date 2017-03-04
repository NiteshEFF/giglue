/**
 * Created by niteshkumar on 04/03/17.
 */
let parser = require('querystring');
let mail = require('../sendMail/Mail');
class RequestParser
{
    constructor(req,res)
    {
       this.req=req;
       this.res=res;
       this.taskScheduler();
    }
    *Iterator()
    {
        let first=yield this.parseData();
    }
    taskScheduler()
    {
        let task=this.Iterator();
        let first = task.next();
        first.value.then((data)=>{
            new mail(this.req,this.res,data);
        });
    }
    parseData()
    {
        return new Promise((resolve,reject)=>{
            let dataParse='';
            this.req.on('data',(data)=>{
                dataParse +=data.toString();
            });
            this.req.on('end',()=>{
                 resolve(JSON.parse(dataParse));
            });
        });
    }
}
module.exports=RequestParser;
