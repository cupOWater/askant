const authRoute = require("./AuthRoute");
const userRoute = require("./UserRoute");
const productRoute = require("./ProductRoute");
const postRoute = require("./PostRoute");
const imageRoute = require("./ImageRoute");

function route(app) {
    app.use('/image', imageRoute);
    app.use('/auth', authRoute);
    app.use('/user', userRoute);
    app.use('/product', productRoute);
    app.use('/post', postRoute);
}

module.exports = route;
