const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware('https://wonulla.to/api',{
            target: 'https://wonulla.to',
            changeOrigin: true
        })
    )
    
}