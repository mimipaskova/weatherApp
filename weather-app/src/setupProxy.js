const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  console.log("executes");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true
    })
  );
};
