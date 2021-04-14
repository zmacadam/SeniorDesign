const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy(`/api/data/`, {
            target: "http://ec2-3-83-230-148.compute-1.amazonaws.com:8080/",
            secure: false,
            changeOrigin: true
        })
    );
};