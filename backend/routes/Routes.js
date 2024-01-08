const authRoute = require("./AuthRoute");
const userRoute = require("./UserRoute");
const productRoute = require("./ProductRoute");
const postRoute = require("./PostRoute");
const imageRoute = require("./ImageRoute");

function route(app) {
    app.use('/image', imageRoute);
    app.use('/api/auth', authRoute);
    app.use('/api/user', userRoute);
    app.use('/api/product', productRoute);
    app.use('/api/post', postRoute);
}

module.exports = route;
