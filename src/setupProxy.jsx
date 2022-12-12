const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware('https://wonulla.to/api',{
            target: 'https://jmdb-six.vercel.app/',
            changeOrigin: true
        })
    )
    
}