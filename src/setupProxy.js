const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const request = require('request');

const app = express();

const pathFilter = function (path, req) {
  return path.match('^/api') && req.method === 'GET';
};


const config = createProxyMiddleware({
  target: "https://minimovie-c672b.web.app/",
  autoRewrite: true,
  changeOrigin: true,
  pathRewrite: {"^/api": ""},
  pathFilter: pathFilter,
})


app.use("/api", config)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));