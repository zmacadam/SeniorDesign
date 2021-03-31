const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy(`/api/data/`, {
            target: "https://covid-tracker-server-api.herokuapp.com/",
            secure: false,
            changeOrigin: true
        })
    );
};