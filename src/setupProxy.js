const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/gasolineras-api",
    createProxyMiddleware({
      target: "https://sedeaplicaciones.minetur.gob.es",
      changeOrigin: true,
      pathRewrite: {
        "^/gasolineras-api": "/ServiciosRESTCarburantes/PreciosCarburantes",
      },
      on: {
        error: (err, req, res) => {
          console.error("Proxy error:", err);
        },
      },
    })
  );
};

