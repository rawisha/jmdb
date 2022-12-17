const { createProxyMiddleware } = require("http-proxy-middleware")
console.log(process.env)
module.exports = app => {
    app.use(
        createProxyMiddleware('/api',{
            target: process.env.REACT_APP_PROXY,
            changeOrigin: true
        })
    )
    
}