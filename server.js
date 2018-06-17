var express = require("express");
var app = express();
var httpProxy = require('http-proxy');

const API_SERVER = process.env.API_SERVER;

var apiProxy = httpProxy.createProxyServer({
    logLevel     : 'debug',
    target       : API_SERVER,
    changeOrigin : true,
    secure       : true,
    xfwd         : true,
    
    // useful in case we need to route something
    // router: {
    //     '/api/auth/login': '{API_SERVER}/auth/login`
    // },
    onProxyReq   : function (proxyReq, req, res) {
        // Browers may send Origin headers even with same-origin
        // requests. To prevent CORS issues, we have to change
        // the Origin to match the target URL.
        if (proxyReq.getHeader('origin')) {
            proxyReq.setHeader('origin', API_SERVER);
        }
    }
});

// Create link to build directory
var distDir = __dirname + "/build/";
app.use(express.static(distDir));

app.disable('x-powered-by');


app.all("/api/*", function(req, res) {
    apiProxy.web(req, res, {target: API_SERVER, debug: true});
});

app.get('*', function(req, res){
  res.sendFile(distDir + 'index.html');
});

server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
