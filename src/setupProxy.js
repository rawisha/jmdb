const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const request = require('request');
const cors = require('cors')
const app = express();

const pathFilter = function (path, req) {
  return path.match('^/api') && req.method === 'GET';
};

app.use(cors(
  {
    allowedHeaders: "*",
    allowMethods: '*',
    origin: '*'
  }
))

const config = createProxyMiddleware({
  target: "https://wonullta.to/",
  autoRewrite: true,
  changeOrigin: true,
  pathRewrite: {"^/api": ""},
  pathFilter: pathFilter,
})


app.use("/api", config)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));