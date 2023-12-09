const puppeteer = require("puppeteer");

class ScrapeDomain {
    constructor(domainName, mainQr, nameQr, priceQr, imgQr, antUrls, tankUrl, equipUrl) {
        this.domainName = domainName;
        this.mainQr = mainQr;
        this.nameQr = nameQr;
        this.priceQr = priceQr;
        this.imgQr = imgQr;
        this.antUrls = antUrls;
        this.tankUrl = tankUrl;
        this.equipUrl = equipUrl;
    }
}

const scrapeDomains = [
    new ScrapeDomain("HT Exotic Zone", ".ant-single-product", ".product-title", ".price", "img",
        [
            "https://hactexoticzone.com/kien-an-thit",
            "https://hactexoticzone.com/kien-an-hat"
        ],
        [
            "https://hactexoticzone.com/tank-nuoi-kien"
        ],
        [
            "https://hactexoticzone.com/vat-dung-nuoi-kien"
        ]
    )
]


// Store as {productName, productPrice, productImgSrc, Domain, Category}
async function scrapeWebsite(domain) {
    const browser = await puppeteer.launch({ headless: "false", defaultViewport: null });
    const page = await browser.newPage(); 
    const result = []

    antUrls = domain.antUrls;
    for (let i = 0; i < antUrls.length; i++) {
        await page.goto(antUrls[i]);
        await page.waitForSelector(domain.mainQr);
        result.push(...await page.$$eval(domain.mainQr, (elements, nameQr, priceQr, imgQr, dmName) => {
            return elements.map(element => {
                const productName = element.querySelector(nameQr).textContent;
                const productPrice = element.querySelector(priceQr).textContent;
                const img = element.querySelector(imgQr)
                const productImg = img.getAttribute("data-lazyload") || img.getAttribute("src");
                return { name: productName, price: productPrice, img: productImg, domain: dmName, category: "Ant" };
            })
        }, domain.nameQr, domain.priceQr, domain.imgQr, domain.domainName));
    }


    await browser.close()
    return result;
}

scrapeWebsite(scrapeDomains[0])
    .then(result => {
        result.map(r => console.log(r));
    })
    .catch(err => {
        console.log("DAMN!");
        console.log(err)
    })


