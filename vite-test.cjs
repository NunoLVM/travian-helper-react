const { createServer } = require('vite');

createServer().then(server => {
  server.listen(5173);
  console.log('Vite server running at http://localhost:5173');
});
