const puppeteer = require("puppeteer");

async function scrapeWebsite(url, selector) {
    const browser = await puppeteer.launch({headless: "false", defaultViewport: null});
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector(selector);
    
    const elementText = await page.$$eval(selector, elements => {
        return elements.map(element => {
            const productName = element.querySelector(".product-title").textContent;
            const productPrice = element.querySelector(".price").textContent;
            const productImg = element.querySelector("img").src;
            return {name: productName, price: productPrice, img: productImg};
        })
    });

    await browser.close()

    return elementText;
}

const websiteURL = "https://hactexoticzone.com/tank-nuoi-kien";
const elementSelector = ".ant-single-product";
const products = []
scrapeWebsite(websiteURL, elementSelector)
    .then(result => {
        result.map(e => {
            console.log(e);
            return;
        })
    })
    .catch(error => {
        console.error("error: ", error)
    })