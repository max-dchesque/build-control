const http = require('http');

const TARGET_HOST = 'localhost';
const TARGET_PORT = 3010;
const PROXY_PORT = 8080;

const server = http.createServer((req, res) => {
  // Adicionar CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Fazer proxy para o Next.js
  const options = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Erro no proxy:', err);
    res.writeHead(500);
    res.end('Erro no proxy');
  });

  req.pipe(proxyReq);
});

server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`🚀 Proxy rodando!`);
  console.log(`📱 Acesse: http://103.199.185.226:${PROXY_PORT}`);
  console.log(`🔗 Local: http://localhost:${PROXY_PORT}`);
});

server.on('error', (err) => {
  console.error('Erro ao iniciar servidor:', err);
  process.exit(1);
});
