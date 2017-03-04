/**
 * Created by niteshkumar on 04/03/17.
 */
let http = require('http');
let FileExplorer=require('./libs/FileExplorer/FileLoader');
let server = http.createServer((req,res)=>{
    let fileLoader = new FileExplorer(req,res);
});
server.listen(3000);

