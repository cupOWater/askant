const e = require("express");
const puppeteer = require("puppeteer");
const ProductModel = require("../model/ProductModel");

class ScrapeDomain {
    constructor(domainName, mainQr, nameQr, priceQr, imgQr, nextQr, linkQr, urls) {
        this.domainName = domainName;
        this.mainQr = mainQr;
        this.nameQr = nameQr;
        this.priceQr = priceQr;
        this.imgQr = imgQr;
        this.nextQr = nextQr;
        this.linkQr = linkQr;
        this.urls = urls;
    }
}

// Store domains with necessary parameters for scraping
const scrapeDomains = [
    new ScrapeDomain("HT Exotic Zone", ".ant-single-product", ".product-title", ".price", "img", "a[title='»']", "a",
        [
            { url: "https://hactexoticzone.com/kien-an-thit", cat: "Ant" },
            { url: "https://hactexoticzone.com/kien-an-hat", cat: "Ant" },
            { url: "https://hactexoticzone.com/tank-nuoi-kien", cat: "Tank" },
            { url: "https://hactexoticzone.com/vat-dung-nuoi-kien", cat: "Supply" }
        ]
    ),
    new ScrapeDomain("S Ants Vietnam ", ".product-small.box", ".title-wrapper", ".price-wrapper span", ".image-zoom img", null, ".title-wrapper a",
        [
            { url: "https://santsvietnam.com/tank-nuoi-kien/", cat: "Tank" },
            { url: "https://santsvietnam.com/phu-kien-nuoi-kien-canh/", cat: "Supply" },
            { url: "https://santsvietnam.com/kien-canh/", cat: "Ant" }
        ]),
    new ScrapeDomain("AntsCanada", ".product.type-product", ".description h2", ".price", "img", ".next.page-numbers", "a",
        [
            { url: "https://www.antscanada.com/product-category/equipment/", cat: "Supply" },
            { url: "https://www.antscanada.com/product-category/ant-habitats/", cat: "Tank" }
        ]),
    new ScrapeDomain("Ant Gear", ".product.type-product", ".woocommerce-loop-product__title", ".price", "img", null, ".woocommerce-LoopProduct-link.woocommerce-loop-product__link",
        [
            {url: "https://antgear.com/product-category/ants/", cat: "Ant"},
            {url: "https://antgear.com/product-category/housing/", cat: "Tank"},
            {url: "https://antgear.com/product-category/supplies/", cat: "Supply"}
        ]
    )
]


// Store as {productName, productPrice, productImgSrc, Domain, Category}
async function scrapeWebsite(domains) {
    const result = []
    const browser = await puppeteer.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", headless: false });
    // const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    for (const domain of domains) {
        const urls = domain.urls;
        for (let i = 0; i < urls.length; i++) {
            page.goto(urls[i].url);
            let nextLink;

            do {
                try {
                    await page.waitForNavigation({ waitUntil: "networkidle0" });
                } catch {
                    break;
                }

                let nextButtonNode = domain.nextQr ? await page.$(domain.nextQr) : null;
                if (nextButtonNode) {
                    nextLink = await nextButtonNode.evaluate(e => e.getAttribute("href"));
                } else {
                    nextLink = null;
                }

                result.push(...await page.$$eval(domain.mainQr, (elements, nameQr, priceQr, imgQr, linkQr, dmName, category) => {
                    return elements.map(element => {
                        const productName = element.querySelector(nameQr);
                        const productPrice = element.querySelector(`${priceQr} ins`) || element.querySelector(priceQr);
                        const img = element.querySelector(imgQr);
                        const link = element.querySelector(linkQr);
                        const productImg = img.getAttribute("data-lazyload") || img.getAttribute("srcset") || img.getAttribute("src");
                        return { name: productName ? productName.textContent : "N/A", price: productPrice ? productPrice.textContent.replace(/\s+/g, '') : "N/A", img: productImg.split(" ")[0], domain: dmName, category: category, link: link ? link.href : "#" };
                    })
                }, domain.nameQr, domain.priceQr, domain.imgQr, domain.linkQr, domain.domainName, urls[i].cat));

                if (nextLink && nextLink !== "#") {
                    page.click(domain.nextQr);
                }
            }
            while (nextLink && nextLink !== "#")
        }
    }


    await browser.close()
    return result;
}

module.exports = {scrapeDomains: scrapeDomains, scrapeWebsite: scrapeWebsite};
