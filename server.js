const http = require('http');
const FileBundle = require('bono-file');

const PORT = process.env.PORT || 3000;

const bundle = new FileBundle();

bundle.use((ctx, next) => {
  console.info(ctx.method, ctx.url);
  return next();
});
bundle.use(require('kcors')());

const server = http.createServer(bundle.callback());

server.listen(PORT, () => {
  console.info(`Listening at http://localhost:${PORT}`);
});
