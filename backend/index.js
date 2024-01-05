const http = require('http');
const app = require("./App")
const server = http.createServer(app);
const schedule = require('node-schedule');
const scrape = require('./controller/scrape');

const port = process.env.SERVER_PORT;
server.listen(port, () => {
    console.log(`Server running on port ${port}...`);
    // Schedule scraping at the start of every week.
    schedule.scheduleJob({hour: 0, minute: 0, dayOfWeek: 0}, scrape)
})
