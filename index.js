const parseArgs = require('minimist');
const httpProxy = require('http-proxy');

const defaultApiTarget = ''; // Change this as you see fit
const defaultPort = 80; // Useful when in a container, change as needed

// Parse Arguments
const argOpts = {
  alias: {
    'h': 'help',
    'p': 'port',
  },
  boolean: [
    'help',
    'silent'
  ],
  default: {
    'api': defaultApiTarget,
    'port': defaultPort
  }
};
const argv = parseArgs( process.argv.slice(2), argOpts );

// Display help msg
if ( argv.help ) {
  console.log(
`Usage: node . [--api <apiUrl>] [--port <port>] [--silent] [--help]

A proxy that ensures the proper CORS headers are present in the response.

Options:
  --api\t\tURL to forward HTTP traffic to. Can be HTTPS
\t\tDefault: ${defaultApiTarget}
  -p, --port\tPort to listen on
\t\tDefault: ${defaultPort}
  --silent\tSilence logging
  -h, --help\tDisplay this help`
);

  process.exit();
}

function log(str) {
  if ( !argv.silent ) {
    console.log(str);
  }
}

log("cors-fixr started with the following options:");
log(argv);

// This is were the real proxy work is done
const proxy = httpProxy.createProxyServer({
  target: argv.api,
  secure: true,
  changeOrigin: true
});

proxy.on('proxyRes', (proxyRes, req, res) => {
  const origin = req.headers.origin;

  log(`${origin} ${req.method} ${req.url}`);
  // Need to debugging? Add additional logging here

  proxyRes.headers['Access-Control-Allow-Origin'] = origin;
  proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD, TRACE, CONNECT';
  proxyRes.headers['Access-Control-Allow-Credentials'] = true;
});

proxy.on('error', (err, req, res) => {
  log(err);
  res.writeHead(502, { 'Content-Type': 'text/plain' });
  res.end( JSON.stringify(err) );
});

proxy.listen(argv.port);

