const authRoute = require("./AuthRoute")
const userRoute = require("./UserRoute");
const postRoute = require("./PostRoute");

function route(app) {
    app.use('/auth', authRoute);
    app.use('/user', userRoute);
    app.use('/post', postRoute);
}

module.exports = route
