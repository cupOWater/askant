const authRoute = require("./AuthRoute");
const userRoute = require("./UserRoute");
const productRoute = require("./ProductRoute");

function route(app) {
    app.use('/auth', authRoute);
    app.use('/user', userRoute);
    app.use('/product', productRoute);
}

module.exports = route;
