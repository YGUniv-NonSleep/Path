const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8080', // REACT_APP_API_URL 사용 가능
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    })
  );
};
