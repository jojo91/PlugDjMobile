var httpProxy = require('http-proxy');
// Error example
//
// Http Proxy Server with bad target
//
var proxy = httpProxy.createServer({
  target:'https://plug.dj',
  secure: false,
  ws: true
});

proxy.listen(8005);

//
// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log(proxyReq._headers);
    proxyReq.setHeader('Host', 'plug.dj');
});


//
// Listen for the `proxyRes` event on `proxy`.
//
proxy.on('proxyRes', function (proxyRes, req, res) {
    console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
    proxyRes.headers["access-control-allow-origin"] = "http://localhost:8100";
    proxyRes.headers["access-Control-Allow-Credentials"] = "true";
});

//
// Listen for the `open` event on `proxy`.
//
proxy.on('open', function (proxySocket) {
  // listen for messages coming FROM the target here
  proxySocket.on('data', hybiParseAndLogMessage);
});

//
// Listen for the `close` event on `proxy`.
//
proxy.on('close', function (req, socket, head) {
  // view disconnected websocket connections
  console.log('Client disconnected');
});