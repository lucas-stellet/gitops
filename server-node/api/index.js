const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({msg: `Hello ${process.env.MY_NAME} from 2021!`}));
  res.end()
});

const gracefullyShutdown = (server) => {
  const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGHUP'];
  
  sigs.forEach((sig) => {
    process.on(sig, () => {
      server.close();
    });
  });
}

gracefullyShutdown(server)

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});