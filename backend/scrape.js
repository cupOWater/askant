const puppeteer = require("puppeteer");

class ScrapeDomain {
    constructor(domainName, mainQr, nameQr, priceQr, imgQr, nextQr, urls) {
        this.domainName = domainName;
        this.mainQr = mainQr;
        this.nameQr = nameQr;
        this.priceQr = priceQr;
        this.imgQr = imgQr;
        this.nextQr = nextQr;
        this.urls = urls;
    }
}

// Store domains with necessary parameters for scraping
const scrapeDomains = [
    new ScrapeDomain("HT Exotic Zone", ".ant-single-product", ".product-title", ".price", "img", "a[title='»']",
        [
            { url: "https://hactexoticzone.com/kien-an-thit", cat: "Ant" },
            { url: "https://hactexoticzone.com/kien-an-hat", cat: "Ant" },
            { url: "https://hactexoticzone.com/tank-nuoi-kien", cat: "Tank" },
            { url: "https://hactexoticzone.com/vat-dung-nuoi-kien", cat: "Supply" }
        ]
    )
]


// Store as {productName, productPrice, productImgSrc, Domain, Category}
async function scrapeWebsite(domain) {
    const browser = await puppeteer.launch({ headless: "false"});
    const page = await browser.newPage();
    const result = []

    urls = domain.urls;
    for (let i = 0; i < urls.length; i++) {
        page.goto(urls[i].url);
        let nextLink;

        do {
            await page.waitForNavigation({waitUntil: "networkidle0"});
            let nextButtonNode = await page.$(domain.nextQr)
            if (nextButtonNode) {
                nextLink = await nextButtonNode.evaluate(e => e.getAttribute("href"));
            }

            result.push(...await page.$$eval(domain.mainQr, (elements, nameQr, priceQr, imgQr, dmName, category) => {
                return elements.map(element => {
                    const productName = element.querySelector(nameQr).textContent;
                    const productPrice = element.querySelector(priceQr).textContent;
                    const img = element.querySelector(imgQr)
                    const productImg = img.getAttribute("data-lazyload") || img.getAttribute("src");
                    return { name: productName, price: productPrice, img: productImg, domain: dmName, category: category };
                })
            }, domain.nameQr, domain.priceQr, domain.imgQr, domain.domainName, urls[i].cat));
 
            if (nextLink && nextLink !== "#") {
                page.click(domain.nextQr);
            }
        }
        while (nextLink && nextLink !== "#")


    }

    await browser.close()
    return result;
}

try {
    scrapeWebsite(scrapeDomains[0]).then(result => {
        result.map(r => console.log(r));
    })
} catch (err) {
    console.log(err);
}


