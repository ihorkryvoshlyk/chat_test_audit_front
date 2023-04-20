const { createProxyMiddleware } = require("http-proxy-middleware");

const targetUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true
    })
  );
};
