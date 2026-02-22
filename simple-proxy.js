const http = require('http');

const TARGET = 'http://localhost:3010';
const PORT = 8000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, TARGET);
  
  const proxyReq = http.request({
    hostname: 'localhost',
    port: 3010,
    path: url.pathname + url.search,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:3010' },
  }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', () => {
    res.writeHead(502);
    res.end('Bad Gateway');
  });

  req.pipe(proxyReq);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Proxy rodando na porta ${PORT}`);
  console.log(`🌐 URL Pública: http://103.199.185.226:${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
});
