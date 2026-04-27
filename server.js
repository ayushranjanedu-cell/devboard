import http from 'http';

const server = http.createServer((req,res)=>{
    if(req.method==='GET'&&req.url==='/'){
        res.writeHead(200,{'content-type':'application/json'});
        res.end(JSON.stringify({message:'Devboard API is alive'}));
    }
    else if(req.method==='GET'&&req.url==='/tasks'){
        const tasks = [
            {id:1,title:'NodeJS learning',status:'in-progress'},
             {id:2,title:'Build Devboard',status:'todo'}
        ];
        res.writeHead(200,{'content-type':'application/json'});
        res.end(JSON.stringify(tasks));
    }
    else if(req.method==='POST'&&req.url==='/tasks'){
        let body='';
        req.on('data',chunk=>{
            body+=chunk.toString();
        });
        req.on('end',()=>{
            const newTasks = JSON.parse(body);
            res.writeHead(201,{'content-type':'application/json'});
            res.end(JSON.stringify({message:'Task created', task: newTasks}));
        });
    }
    else{
        res.writeHead(404,{'content-type':'application/json'});
        res.end(JSON.stringify({error:'Route not found'}));
    }

});
    server.listen(3000,()=>{
console.log('Server is running on port 3000');
    });