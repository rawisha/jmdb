const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const request = require('request');

const app = express();

const config = createProxyMiddleware({
  target: "https://wonulla.to/api",
  changeOrigin: true,
  pathRewrite: {"^/config": ""}
})


app.use("/api", config)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));