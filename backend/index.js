const http = require('http');
const app = require("./App")
const server = http.createServer(app);

const port = process.env.SERVER_PORT;


server.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})
