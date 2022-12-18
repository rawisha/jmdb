const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();



const options = {
  target: 'https://wonulla.to', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api': '', // rewrite path
  },
};

const exampleProxy = createProxyMiddleware(options);


app.use('/api', exampleProxy);
