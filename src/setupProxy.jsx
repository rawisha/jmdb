const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware('https://jmdb-six.vercel.app/api',{
            target: 'https://wonulla.to',
            changeOrigin: true
        })
    )
    
}