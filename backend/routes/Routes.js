const authRoute = require("./AuthRoute")
const userRoute = require("./UserRoute");

function route(app) {
    app.use('/auth', authRoute);
    app.use('/user', userRoute);
}

module.exports = route
