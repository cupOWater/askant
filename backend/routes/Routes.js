const userRoute = require("./UserRoute");

function route(app) {
    app.use('/user', userRoute);
}

module.exports = route
