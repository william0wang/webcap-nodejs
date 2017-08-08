#!/usr/bin/env node

const restify = require('restify');
const Pageres = require('pageres');
const fs = require('fs');
const path ='/tmp/webcap';

function respond(req, res, next) {

    let uri = req.params.uri;
    let name = req.params.name;
    let size = req.params.size;
    let delay = req.params.delay;
    let fpath = path + '/images/' + name + '.jpg';
    let ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E277 Safari/602.1";

    try {
        if (fsExists(fpath)) {
            fs.unlinkSync(fpath)
        }

        if (uri.indexOf("http") != 0)
            uri = "http://" + uri;

            if(req.params.ua) {
                ua = req.params.ua;
                if (ua === "desktop") {
                    ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4";
                }
            }
            
        new Pageres().src(uri, [size], {format : "jpg", filename : name, delay : delay, userAgent : ua})
        .dest(path+ '/images/').run().then((streams) => {
            if (streams.length > 0) {
                res.send( {
                        ret : 0,
                        error : {},
                        file : 'images/' + streams[0].filename
                    }
                );
            } else {
                res.send( {
                        ret : -1,
                        error : { cap : 'cap error!'},
                        file : ''
                    }
                );
            }
            next();
        }
        ).catch(function(e) {
            res.send({
                ret : -1,
                error : e,
                file : ""
            });
            next();
        });
    } catch(e) {
        res.send({
            ret : -1,
            error : e,
            file : ""
        });
        next();
    }
}

function fsExists(path) {
    try{
        fs.accessSync(path, fs.F_OK);
    } catch(e) {
        return false;
    }
    return true;
}

const server = restify.createServer({
   name: 'webcap',
  version: '1.0.2'
});

server.get('/cap/:uri/:name/:size/:delay', respond);
server.get('/cap/:uri/:name/:size/:delay/:ua', respond);
server.get(/\/images\/?.*/, restify.plugins.serveStatic({
    directory: path
}));

server.listen(7381, function() {
  console.log('%s listening at %s', server.name, server.url);
});
