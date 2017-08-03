var restify = require('restify');
const Pageres = require('pageres');

function respond(req, res, next) {

  var uri = req.params.uri
  var path = req.params.path
  var name = req.params.name
  var delay = req.params.delay
  var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E277 Safari/602.1"

  if (uri.indexOf("http") != 0)
    uri = "http://" + uri

    if(req.params.ua) {
        ua = req.params.ua
        if (ua === "desktop") {
            ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4"
        }
    }

  const streams = new Pageres()
    .src(uri, ['1080x1920'], {format : "jpg", filename : name, delay : delay, userAgent : ua})
    .dest(path).run().then(() => {
        res.send( {
            ret : 0,
            error : {},
            file : path + '/' + name + '.jpg'
        }
        );
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
}

var server = restify.createServer({
   name: 'ds_api',
  version: '1.0.0'
});

server.get('/cap/:uri/:path/:name/:delay', respond);
server.get('/cap/:uri/:path/:name/:delay/:ua', respond);

server.listen(7381, function() {
  console.log('%s listening at %s', server.name, server.url);
});
