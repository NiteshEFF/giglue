/**
 * Created by niteshkumar on 04/03/17.
 */
let fs = require('fs');
let path=require('path');
let mime = require('mime');
let RequestParser = require('../RequestData/RequestParser');
let cache={};
class FileLoader
{
    constructor(req,res)
    {
        this.res=res;
        if(req.method=='GET') {
            switch(req.url)
            {
                case '/':this.file = 'public/index.htm';
                break;
                default:this.file = 'public/' + req.url;
            }
            this.absolutePath = './' + this.file;
            this.readFile();
        }
        else if(req.method=="POST")
        {
            switch (req.url)
            {
                case '/sendMessage':
                    let request=new RequestParser(req,res);
                    break;
            }
        }
    }
    readFile()
    {
        if(!cache[this.absolutePath]) {
            let file = fs.readFile(this.absolutePath, (err, data) => {
                if (err) {
                    this.show404();
                }
                else {

                    cache[this.absolutePath] = data;
                    this.showData(data);
                }
            });
        }
        else
        {
            this.showData(cache[this.absolutePath]);
        }
    }
    showData(data) {
    this.res.writeHead(200,{"Content-Type":mime.lookup(path.basename(this.absolutePath))});
    this.res.end(data);
    }
    show404() {
    this.res.writeHead(404,{"Content-Type":"text/plain"});
    this.res.write("file not Found");
    this.res.end();
    }
}
module.exports=FileLoader;